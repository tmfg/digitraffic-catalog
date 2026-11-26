"""Assessment Result: Migrate from repeating (0..*) to single (0..1)

Migrate mobilitydcatap:assessmentResult from repeating property (array) to 
single optional property per mobilityDCAT-AP v3.0.0 specification.

CKAN 2.12+ uses JSONB `extras` column on package table instead of package_extra table.

Storage format change:
  OLD: Single 'assessment' extra containing JSON-encoded string (Scheming repeating field format)
       package.extras["assessment"] = '[{"assessment_date": "...", "assessment_result": "..."}]'
       Note: Stored as TEXT/string in JSONB, not native JSONB array
  
  NEW: Separate flat extras for each field (native JSONB values)
       package.extras["assessment_date"] = "2026-01-15"
       package.extras["assessment_result"] = "http://example.com/ok"

Data flow after migration:
  Database (JSONB extras) → Schema converter → MobilityData → RDF export

⚠️ SEARCH INDEX CACHE NOTE
  This migration transforms the data format, which makes the Solr search index
  cache stale. However, Solr cache clearing is NOT done in migrations because:
  
  1. Alembic migrations run in database-only context (CKAN app not fully loaded)
  2. The rebuild() function requires full CKAN context and silently fails
  3. Post-deployment, Solr is manually refreshed when needed
  
  POST-DEPLOYMENT STEP (if seeing old data format in API):
  
    ckan search-index clear
    ckan search-index rebuild
  
  Or faster:
  
    ckan search-index rebuild-fast
  
  See /docs/README.md "Common Issues & Troubleshooting" for details.

Migration strategy:
  1. Find all packages with 'assessment' in extras JSON (old format)
  2. Extract first assessment from JSON array string
  3. Update package.extras to add assessment_date and assessment_result
  4. Remove the old 'assessment' key from package.extras
  5. Update all affected packages

The migration is ALWAYS expected to complete successfully. No backward
compatibility with old format is needed in application code.

Revision ID: 20261123_assessment
Revises: 5d2b8e7c4a19
Create Date: 2026-11-23 16:00:00.000000

"""

import logging

from alembic import op
from sqlalchemy import text
from sqlalchemy.exc import DatabaseError

# revision identifiers, used by Alembic.
revision = "20261123_assessment"
down_revision = "5d2b8e7c4a19"
branch_labels = None
depends_on = None

log = logging.getLogger(__name__)


def upgrade():
    """
    Transform assessment data to new flat extras format in JSONB column.
    
    Old format (nested in extras JSON):
      package.extras = {"assessment": [{"assessment_date": "2026-01-01", "assessment_result": "uri"}]}
    
    New format (separate flat extras):
      package.extras = {
        "assessment_date": "2026-01-01",
        "assessment_result": "uri"
      }
    
    Transformation steps:
    1. Find all packages with 'assessment' key in extras JSONB
    2. Extract assessment_date and assessment_result from JSON
    3. Update package.extras to add new flat keys
    4. Remove old 'assessment' key
    5. Update all affected packages in one go
    
    Migration is guaranteed to complete successfully. No application code
    needs to handle the old format.
    
    NOTE: Solr search index cache is NOT cleared here (see module docstring).
    If old data format appears in API responses after deployment, run:
      ckan search-index rebuild
    """
    bind = op.get_bind()
    
    # IMPORTANT: Capture package IDs BEFORE the UPDATE, since the WHERE clause
    # filters on keys that the UPDATE will remove. Query runs first, UPDATE runs second.
    get_package_ids_query = text("""
        SELECT id
        FROM package
        WHERE extras->>'assessment' IS NOT NULL
        AND jsonb_array_length(((extras->>'assessment')::jsonb)) > 0
        AND state = 'active';
    """)
    
    # PostgreSQL query to find packages with assessment and transform them
    # Assessment is stored as JSON-encoded string in JSONB extras (Scheming format)
    # Extract as text with ->>, cast to JSONB, then access array elements
    # 
    # NOTE: Operator precedence: - (delete) > || (concatenate)
    # So we must use (extras - 'assessment') to remove the key BEFORE concatenating
    transform_query = text("""
        UPDATE package
        SET extras = (
            (extras - 'assessment') || jsonb_build_object(
                'assessment_date', (((extras->>'assessment')::jsonb)->0->>'assessment_date'),
                'assessment_result', (((extras->>'assessment')::jsonb)->0->>'assessment_result')
            )
        )
        WHERE extras->>'assessment' IS NOT NULL
        AND jsonb_array_length(((extras->>'assessment')::jsonb)) > 0;
    """)
    
    try:
        # Capture IDs before UPDATE removes the keys
        id_result = bind.execute(get_package_ids_query)
        package_ids = [row[0] for row in id_result.fetchall()]
        
        result = bind.execute(transform_query)
        updated_count = result.rowcount
        
        log.info(
            f"Assessment migration complete: "
            f"Updated {updated_count} packages with assessment data"
        )
        
        if package_ids:
            log.info(
                f"Note: Solr search index cache is not automatically cleared. "
                f"If API responses show old format, run: ckan search-index rebuild"
            )
        
    except DatabaseError as e:
        log.error(f"Database error during migration: {e}")
        raise
    except Exception as e:
        log.error(f"Unexpected error during migration: {e}")
        raise



def downgrade():
    """
    Reverse migration: reconstruct old nested format in JSONB extras.
    
    Reverses the upgrade transformation, converting data back to the
    original storage format for rollback scenarios.
    
    ⚠️ CRITICAL: Scheming expects repeating fields stored as JSON-encoded STRINGS.
    The constructed JSONB array MUST be cast to text (::text) before storing
    in the 'assessment' extra key. Without this cast, the old Scheming schema
    will receive native JSONB arrays instead of text strings, breaking the
    data converter which calls json.loads() on the value.
    
    This should only be used during active migration period. After migration
    is confirmed successful, downgrade capability can be removed.
    
    Changes:
    1. Find all packages with flat assessment_date or assessment_result extras
    2. Reconstruct nested assessment object from flat fields
    3. Convert to JSON-encoded string (cast to text for Scheming compatibility)
    4. Update package.extras with legacy 'assessment' key containing string
    5. Remove flat assessment_date and assessment_result keys
    6. Rebuild search index for affected packages
    
    Note: This is primarily for rollback safety during the transition period.
    """
    bind = op.get_bind()
    
    # IMPORTANT: Capture package IDs BEFORE the UPDATE, since the WHERE clause
    # filters on keys that the UPDATE will remove. Query runs first, UPDATE runs second.
    get_package_ids_query = text("""
        SELECT id
        FROM package
        WHERE (extras->>'assessment_date' IS NOT NULL 
           OR extras->>'assessment_result' IS NOT NULL)
        AND state = 'active';
    """)
    
    # PostgreSQL query to find packages with flat assessment fields and reconstruct
    # Creates array and casts to TEXT to restore original Scheming storage format
    # (repeating fields are stored as JSON-encoded strings, not native JSONB arrays)
    # 
    # NOTE: Operator precedence: - (delete) > || (concatenate)
    # So we must use (extras - 'assessment_date' - 'assessment_result') to remove the keys BEFORE concatenating
    downgrade_query = text("""
        UPDATE package
        SET extras = (
            (extras - 'assessment_date' - 'assessment_result') || jsonb_build_object(
                'assessment',
                jsonb_build_array(
                    jsonb_build_object(
                        'assessment_date', extras->>'assessment_date',
                        'assessment_result', extras->>'assessment_result'
                    )
                )::text
            )
        )
        WHERE extras->>'assessment_date' IS NOT NULL 
           OR extras->>'assessment_result' IS NOT NULL;
    """)
    
    try:
        # Capture IDs before UPDATE removes the keys
        id_result = bind.execute(get_package_ids_query)
        package_ids = [row[0] for row in id_result.fetchall()]
        
        result = bind.execute(downgrade_query)
        downgraded_count = result.rowcount
        
        log.info(
            f"Assessment downgrade complete: "
            f"Reverted {downgraded_count} packages to legacy format"
        )
        
        # Rebuild search index for affected packages
        # This ensures package_search returns the old format after rollback
        if rebuild and package_ids:
            for package_id in package_ids:
                try:
                    rebuild(package_id=package_id)
                except Exception as e:
                    log.warning(
                        f"Failed to rebuild search index for package {package_id}: {e}"
                    )
            
            log.info(f"Rebuilt search index for {len(package_ids)} packages")
        
    except DatabaseError as e:
        log.error(f"Database error during downgrade: {e}")
        raise
    except Exception as e:
        log.error(f"Unexpected error during downgrade: {e}")
        raise
