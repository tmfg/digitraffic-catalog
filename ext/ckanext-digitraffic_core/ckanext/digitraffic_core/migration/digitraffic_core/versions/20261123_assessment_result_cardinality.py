"""Assessment Result: Migrate from repeating (0..*) to single (0..1)

Migrate mobilitydcatap:assessmentResult from repeating property (array) to 
single optional property per mobilityDCAT-AP v3.0.0 specification.

The new schema reads assessment data from separate flat extras:
  - assessment_date: The date of the latest assessment
  - assessment_result: URL for the results of the assessment
  
Migration strategy:
  1. Find all packages with 'assessment' extra field (old format)
  2. Extract first assessment if array, or use single object as-is
  3. Write assessment_date and assessment_result to separate flat extras
  4. Delete the old 'assessment' extra (retire legacy format)

Revision ID: 20261123_assessment
Revises: 5d2b8e7c4a19
Create Date: 2026-11-23 16:00:00.000000

"""

import json
import logging
from uuid import uuid4

from alembic import op
from sqlalchemy import text
from sqlalchemy.exc import DatabaseError
from sqlalchemy import inspect

# revision identifiers, used by Alembic.
revision = "20261123_assessment"
down_revision = "5d2b8e7c4a19"
branch_labels = None
depends_on = None

log = logging.getLogger(__name__)


def get_bind():
    """Get the database connection bind."""
    return op.get_bind()


def upgrade():
    """
    Migrate assessment data from old format to new flat extras format.
    
    Old format: Single 'assessment' extra with JSON object
        {"assessment_date": "2026-01-01", "assessment_result": "https://..."}
    
    New format: Separate flat extras
        assessment_date: "2026-01-01"
        assessment_result: "https://..."
    
    Changes:
    1. Find all packages with 'assessment' extra field
    2. Extract assessment_date and assessment_result from the JSON object
    3. Create new flat extras for each field
    4. Delete the old 'assessment' extra
    5. If multiple assessments in array, keep first (oldest/most authoritative)
    """
    bind = get_bind()
    
    # Check if package_extra table exists (may not on first CKAN init)
    inspector = inspect(bind)
    if not inspector.has_table('package_extra'):
        log.info("package_extra table does not exist yet. Skipping assessment migration.")
        log.info("This is normal on first database initialization. Migration will apply after CKAN init.")
        return
    
    # Query all assessment extras with their package IDs (including inactive/deleted)
    query = text("""
        SELECT pe.id, pe.package_id, pe.key, pe.value, pe.state
        FROM package_extra pe
        WHERE pe.key = 'assessment'
        ORDER BY pe.package_id, pe.id
    """)
    
    try:
        result = bind.execute(query)
        rows = result.fetchall()
        
        migrated_count = 0
        multi_assessment_count = 0
        skipped_count = 0
        
        for row in rows:
            extra_id, package_id, key, value, state = row
            
            if not value:
                log.debug(f"Package {package_id}: Assessment is empty/null, deleting old extra")
                # Delete the old empty assessment extra
                delete_query = text("DELETE FROM package_extra WHERE id = :extra_id")
                bind.execute(delete_query, {"extra_id": extra_id})
                continue
            
            try:
                # Parse JSON value
                assessment_data = json.loads(value) if isinstance(value, str) else value
                
                if assessment_data is None:
                    log.debug(f"Package {package_id}: Assessment is None, deleting old extra")
                    # Delete the old null assessment extra
                    delete_query = text("DELETE FROM package_extra WHERE id = :extra_id")
                    bind.execute(delete_query, {"extra_id": extra_id})
                    continue
                
                # Extract assessment object (handle both array and single object cases)
                assessment_obj = None
                if isinstance(assessment_data, list):
                    if len(assessment_data) == 0:
                        log.info(f"Package {package_id}: Empty assessment array, deleting old extra")
                        delete_query = text("DELETE FROM package_extra WHERE id = :extra_id")
                        bind.execute(delete_query, {"extra_id": extra_id})
                        continue
                    elif len(assessment_data) == 1:
                        log.debug(f"Package {package_id}: Single assessment in array, extracting")
                        assessment_obj = assessment_data[0]
                        migrated_count += 1
                    else:
                        log.warning(
                            f"Package {package_id}: Multiple assessments ({len(assessment_data)}) found. "
                            f"Keeping first assessment"
                        )
                        assessment_obj = assessment_data[0]
                        multi_assessment_count += 1
                        migrated_count += 1
                elif isinstance(assessment_data, dict):
                    log.debug(f"Package {package_id}: Assessment is already a single object, using as-is")
                    assessment_obj = assessment_data
                    migrated_count += 1
                else:
                    log.warning(f"Package {package_id}: Unexpected assessment type {type(assessment_data)}, skipping")
                    skipped_count += 1
                    continue
                
                # Extract fields from the assessment object
                assessment_date = assessment_obj.get("assessment_date") if isinstance(assessment_obj, dict) else None
                assessment_result = assessment_obj.get("assessment_result") if isinstance(assessment_obj, dict) else None
                
                # Create new flat extras if they have values
                if assessment_date:
                    create_flat_extra(bind, package_id, "assessment_date", assessment_date, state)
                    log.debug(f"Package {package_id}: Created assessment_date extra (state: {state})")
                
                if assessment_result:
                    create_flat_extra(bind, package_id, "assessment_result", assessment_result, state)
                    log.debug(f"Package {package_id}: Created assessment_result extra (state: {state})")
                
                # Delete the old assessment extra (retire legacy format)
                delete_query = text("DELETE FROM package_extra WHERE id = :extra_id")
                bind.execute(delete_query, {"extra_id": extra_id})
                log.debug(f"Package {package_id}: Deleted old assessment extra")
                
            except json.JSONDecodeError as e:
                log.error(f"Package {package_id}: Failed to parse assessment JSON: {e}")
                skipped_count += 1
                continue
            except Exception as e:
                log.error(f"Package {package_id}: Unexpected error during migration: {e}")
                skipped_count += 1
                continue
        
        log.info(
            f"Assessment migration complete: "
            f"Migrated {migrated_count} packages, "
            f"{multi_assessment_count} with multiple assessments (kept first), "
            f"Skipped {skipped_count} packages"
        )
        
    except DatabaseError as e:
        log.error(f"Database error during migration: {e}")
        raise
    except Exception as e:
        log.error(f"Unexpected error during migration: {e}")
        raise


def create_flat_extra(bind, package_id: str, key: str, value: str, state: str = 'active'):
    """Create a new flat extra field for the package with optional state."""
    extra_id = str(uuid4())
    insert_query = text("""
        INSERT INTO package_extra (id, package_id, key, value, state)
        VALUES (:extra_id, :package_id, :key, :value, :state)
    """)
    bind.execute(insert_query, {
        "extra_id": extra_id,
        "package_id": package_id,
        "key": key,
        "value": value,
        "state": state
    })


def downgrade():
    """
    Reverse the migration: reconstruct legacy 'assessment' extra from flat fields.
    
    This downgrade:
    1. Finds all packages with separate assessment_date and/or assessment_result extras
    2. Combines them into a single assessment object (old format)
    3. Creates a new 'assessment' extra with the combined object
    4. Deletes the flat assessment_date and assessment_result extras
    5. Wraps single assessments in an array (legacy format required arrays)
    
    Note: This reverses the upgrade migration's data transformation.
    """
    bind = get_bind()
    
    # Check if package_extra table exists (may not on first CKAN init)
    inspector = inspect(bind)
    if not inspector.has_table('package_extra'):
        log.info("package_extra table does not exist yet. Skipping assessment downgrade.")
        return
    
    try:
        # Find all packages that have assessment_date or assessment_result extras (all states)
        packages_query = text("""
            SELECT DISTINCT package_id
            FROM package_extra
            WHERE (key = 'assessment_date' OR key = 'assessment_result')
            ORDER BY package_id
        """)
        
        result = bind.execute(packages_query)
        package_ids = [row[0] for row in result.fetchall()]
        
        downgraded_count = 0
        
        for package_id in package_ids:
            # Get assessment_date and assessment_result values/states for this package (all states)
            date_query = text("""
                SELECT value, state FROM package_extra
                WHERE package_id = :package_id
                AND key = 'assessment_date'
                LIMIT 1
            """)
            
            result_query = text("""
                SELECT value, state FROM package_extra
                WHERE package_id = :package_id
                AND key = 'assessment_result'
                LIMIT 1
            """)
            
            date_result = bind.execute(date_query, {"package_id": package_id})
            date_row = date_result.fetchone()
            assessment_date = date_row[0] if date_row else None
            date_state = date_row[1] if date_row else None
            
            result_result = bind.execute(result_query, {"package_id": package_id})
            result_row = result_result.fetchone()
            assessment_result = result_row[0] if result_row else None
            result_state = result_row[1] if result_row else None
            
            # Reconstruct the assessment object
            assessment_obj = {}
            if assessment_date:
                assessment_obj["assessment_date"] = assessment_date
            if assessment_result:
                assessment_obj["assessment_result"] = assessment_result
            
            if not assessment_obj:
                log.debug(f"Package {package_id}: No assessment data found, skipping")
                continue
            
            # Wrap in array (legacy format required arrays)
            legacy_assessment = [assessment_obj]
            legacy_assessment_json = json.dumps(legacy_assessment)
            
            # Preserve the state from one of the flat extras (prefer date_state if present)
            preserved_state = date_state or result_state or 'active'
            
            # Create the legacy 'assessment' extra with preserved state
            assessment_extra_id = str(uuid4())
            insert_query = text("""
                INSERT INTO package_extra (id, package_id, key, value, state)
                VALUES (:extra_id, :package_id, 'assessment', :value, :state)
            """)
            bind.execute(insert_query, {
                "extra_id": assessment_extra_id,
                "package_id": package_id,
                "value": legacy_assessment_json,
                "state": preserved_state
            })
            log.debug(f"Package {package_id}: Created legacy assessment extra (state: {preserved_state})")
            
            # Delete the flat extras (all states)
            delete_query = text("""
                DELETE FROM package_extra
                WHERE package_id = :package_id
                AND key IN ('assessment_date', 'assessment_result')
            """)
            bind.execute(delete_query, {"package_id": package_id})
            log.debug(f"Package {package_id}: Deleted flat assessment extras")
            
            downgraded_count += 1
        
        log.info(f"Assessment downgrade complete: Downgraded {downgraded_count} packages")
        
    except DatabaseError as e:
        log.error(f"Database error during downgrade: {e}")
        raise
    except Exception as e:
        log.error(f"Unexpected error during downgrade: {e}")
        raise
