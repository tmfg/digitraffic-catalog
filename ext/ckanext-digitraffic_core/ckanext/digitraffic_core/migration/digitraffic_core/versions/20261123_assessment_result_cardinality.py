"""Assessment Result: Migrate from repeating (0..*) to single (0..1)

Migrate mobilitydcatap:assessmentResult from repeating property (array) to 
single optional property per mobilityDCAT-AP v3.0.0 specification.

Revision ID: 20261123_assessment
Revises: 5d2b8e7c4a19
Create Date: 2026-11-23 16:00:00.000000

"""

import json
import logging
from typing import Any

import sqlalchemy as sa
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
    Migrate assessment data from repeating array to single optional field.
    
    Changes:
    1. Find all packages with 'assessment' extra field
    2. If assessment is an array, extract first element only
    3. If assessment is null/empty, set to null
    4. Update the extra field value
    
    Strategy: Keep first (oldest/most authoritative) assessment when multiple exist.
    """
    bind = get_bind()
    
    # Check if package_extra table exists (may not on first CKAN init)
    inspector = op.get_context().bind.inspector
    if not inspector.has_table('package_extra'):
        log.info("package_extra table does not exist yet. Skipping assessment migration.")
        log.info("This is normal on first database initialization. Migration will apply after CKAN init.")
        return
    
    # Query all assessment extras
    query = text("""
        SELECT pe.id, pe.package_id, pe.key, pe.value
        FROM package_extra pe
        WHERE pe.key = 'assessment'
        AND pe.state = 'active'
        ORDER BY pe.package_id, pe.id
    """)
    
    try:
        result = bind.execute(query)
        rows = result.fetchall()
        
        migrated_count = 0
        multi_assessment_count = 0
        
        for row in rows:
            extra_id, package_id, key, value = row
            
            if not value:
                log.debug(f"Package {package_id}: Assessment is empty/null, skipping")
                continue
            
            try:
                # Parse JSON value
                assessment_data = json.loads(value) if isinstance(value, str) else value
                
                if assessment_data is None:
                    log.debug(f"Package {package_id}: Assessment is None, skipping")
                    continue
                
                # Handle case where assessment is already an array
                if isinstance(assessment_data, list):
                    if len(assessment_data) == 0:
                        log.info(f"Package {package_id}: Empty assessment array, setting to null")
                        new_value = None
                    elif len(assessment_data) == 1:
                        log.debug(f"Package {package_id}: Single assessment in array, extracting")
                        new_value = assessment_data[0]
                        migrated_count += 1
                    else:
                        log.warning(
                            f"Package {package_id}: Multiple assessments ({len(assessment_data)}) found. "
                            f"Keeping first assessment: {assessment_data[0]}"
                        )
                        new_value = assessment_data[0]
                        multi_assessment_count += 1
                        migrated_count += 1
                
                # Handle case where assessment is already a single object
                elif isinstance(assessment_data, dict):
                    log.debug(f"Package {package_id}: Assessment is already a single object, keeping as-is")
                    new_value = assessment_data
                    migrated_count += 1
                
                else:
                    log.warning(f"Package {package_id}: Unexpected assessment type {type(assessment_data)}, skipping")
                    continue
                
                # Update the value
                new_value_json = json.dumps(new_value) if new_value is not None else None
                
                update_query = text("""
                    UPDATE package_extra
                    SET value = :new_value
                    WHERE id = :extra_id
                """)
                
                bind.execute(update_query, {"new_value": new_value_json, "extra_id": extra_id})
                
            except json.JSONDecodeError as e:
                log.error(f"Package {package_id}: Failed to parse assessment JSON: {e}")
                continue
            except Exception as e:
                log.error(f"Package {package_id}: Unexpected error during migration: {e}")
                continue
        
        log.info(
            f"Assessment migration complete: "
            f"Migrated {migrated_count} packages, "
            f"{multi_assessment_count} with multiple assessments (kept first)"
        )
        
    except DatabaseError as e:
        log.error(f"Database error during migration: {e}")
        raise
    except Exception as e:
        log.error(f"Unexpected error during migration: {e}")
        raise


def downgrade():
    """
    Reverse the migration: convert single assessments back to arrays.
    
    Note: This is not a perfect reversal as we don't know the original
    array structure. Each single assessment becomes a single-element array.
    Multiple assessments that were consolidated cannot be recovered.
    """
    bind = get_bind()
    
    # Check if package_extra table exists (may not on first CKAN init)
    inspector = inspect(bind)
    if not inspector.has_table('package_extra'):
        log.info("package_extra table does not exist yet. Skipping assessment downgrade.")
        return
    
    # Query all assessment extras
    query = text("""
        SELECT pe.id, pe.package_id, pe.key, pe.value
        FROM package_extra pe
        WHERE pe.key = 'assessment'
        AND pe.state = 'active'
        ORDER BY pe.package_id, pe.id
    """)
    
    try:
        result = bind.execute(query)
        rows = result.fetchall()
        
        downgraded_count = 0
        
        for row in rows:
            extra_id, package_id, key, value = row
            
            if not value:
                log.debug(f"Package {package_id}: Assessment is empty/null, skipping")
                continue
            
            try:
                # Parse JSON value
                assessment_data = json.loads(value) if isinstance(value, str) else value
                
                if assessment_data is None:
                    log.debug(f"Package {package_id}: Assessment is None, skipping")
                    continue
                
                # If it's already an array, skip (shouldn't happen in downgrade)
                if isinstance(assessment_data, list):
                    log.debug(f"Package {package_id}: Assessment is already an array, skipping")
                    continue
                
                # If it's a dict (single assessment), wrap in array
                elif isinstance(assessment_data, dict):
                    log.debug(f"Package {package_id}: Converting single assessment to array")
                    new_value = [assessment_data]
                    downgraded_count += 1
                
                else:
                    log.warning(f"Package {package_id}: Unexpected assessment type {type(assessment_data)}, skipping")
                    continue
                
                # Update the value
                new_value_json = json.dumps(new_value)
                
                update_query = text("""
                    UPDATE package_extra
                    SET value = :new_value
                    WHERE id = :extra_id
                """)
                
                bind.execute(update_query, {"new_value": new_value_json, "extra_id": extra_id})
                
            except json.JSONDecodeError as e:
                log.error(f"Package {package_id}: Failed to parse assessment JSON: {e}")
                continue
            except Exception as e:
                log.error(f"Package {package_id}: Unexpected error during downgrade: {e}")
                continue
        
        log.info(f"Assessment downgrade complete: Downgraded {downgraded_count} packages")
        
    except DatabaseError as e:
        log.error(f"Database error during downgrade: {e}")
        raise
    except Exception as e:
        log.error(f"Unexpected error during downgrade: {e}")
        raise
