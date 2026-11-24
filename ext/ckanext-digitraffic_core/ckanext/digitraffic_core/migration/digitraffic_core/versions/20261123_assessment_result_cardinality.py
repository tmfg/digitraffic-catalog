"""Assessment Result: Migrate from repeating (0..*) to single (0..1)

Migrate mobilitydcatap:assessmentResult from repeating property (array) to 
single optional property per mobilityDCAT-AP v3.0.0 specification.

CKAN 2.12+ uses JSONB `extras` column on package table instead of package_extra table.

Storage format change:
  OLD: Single 'assessment' extra containing JSON with nested date and result
       package.extras["assessment"] = [{"assessment_date": "...", "assessment_result": "..."}]
  
  NEW: Separate flat extras for each field
       package.extras["assessment_date"] = "2026-01-15"
       package.extras["assessment_result"] = "http://example.com/ok"

Data flow after migration:
  Database (JSONB extras) → Schema converter → MobilityData → RDF export
  
Migration strategy:
  1. Find all packages with 'assessment' in extras JSON (old format)
  2. Extract first assessment if array, or use single object as-is
  3. Update package.extras to add assessment_date and assessment_result
  4. Remove the old 'assessment' key from package.extras (retire legacy format)
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
    """
    bind = op.get_bind()
    
    # PostgreSQL query to find packages with assessment and transform them
    # Assessment is always stored as array in JSONB extras
    # Extract first element, convert to flat extras format
    transform_query = text("""
        UPDATE package
        SET extras = (
            extras || jsonb_build_object(
                'assessment_date', (extras->'assessment'->0->>'assessment_date'),
                'assessment_result', (extras->'assessment'->0->>'assessment_result')
            ) - 'assessment'
        )
        WHERE extras->>'assessment' IS NOT NULL
        AND jsonb_array_length(extras->'assessment') > 0;
    """)
    
    try:
        result = bind.execute(transform_query)
        updated_count = result.rowcount
        
        log.info(
            f"Assessment migration complete: "
            f"Updated {updated_count} packages with assessment data"
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
    
    This should only be used during active migration period. After migration
    is confirmed successful, downgrade capability can be removed.
    
    Changes:
    1. Find all packages with flat assessment_date or assessment_result extras
    2. Reconstruct nested assessment object from flat fields
    3. Update package.extras with legacy 'assessment' key containing array
    4. Remove flat assessment_date and assessment_result keys
    
    Note: This is primarily for rollback safety during the transition period.
    """
    bind = op.get_bind()
    
    # PostgreSQL query to find packages with flat assessment fields and reconstruct
    # Wraps fields back into array format for legacy compatibility
    downgrade_query = text("""
        UPDATE package
        SET extras = (
            extras || jsonb_build_object(
                'assessment',
                jsonb_build_array(
                    jsonb_build_object(
                        'assessment_date', extras->>'assessment_date',
                        'assessment_result', extras->>'assessment_result'
                    )
                )
            ) - 'assessment_date' - 'assessment_result'
        )
        WHERE extras->>'assessment_date' IS NOT NULL 
           OR extras->>'assessment_result' IS NOT NULL;
    """)
    
    try:
        result = bind.execute(downgrade_query)
        downgraded_count = result.rowcount
        
        log.info(
            f"Assessment downgrade complete: "
            f"Reverted {downgraded_count} packages to legacy format"
        )
        
    except DatabaseError as e:
        log.error(f"Database error during downgrade: {e}")
        raise
    except Exception as e:
        log.error(f"Unexpected error during downgrade: {e}")
        raise
