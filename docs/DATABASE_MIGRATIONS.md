# Database Migrations Guide

This guide covers best practices for creating and deploying database migrations in the digitraffic catalog.

## Table of Contents

- [Quick Start](#quick-start)
- [The Database Migration Guarantee](#the-database-migration-guarantee)
- [Migration Basics](#migration-basics)
- [Format-Changing Migrations](#format-changing-migrations)
- [Solr Cache Management](#solr-cache-management)
- [Testing Migrations](#testing-migrations)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

**To create a migration:**

1. Create file: `migration/digitraffic_core/versions/<14-digit-timestamp>_<description>.py`
2. Use Alembic format: https://docs.ckan.org/en/2.12/contributing/database-migrations.html
3. If changing data format → add post-deployment notes (see [Format-Changing Migrations](#format-changing-migrations))
4. Test on staging database before prod deployment

**To run migrations:**

Migrations run automatically during container initialization (before app starts).

**If migrations fail:**

1. Check application logs for error details
2. Fix the migration file
3. Re-deploy (migrations are re-run from latest applied version)

---

## The Database Migration Guarantee

**All database migrations are GUARANTEED to complete successfully before the application starts.**

This principle is fundamental:

- Migrations run during container initialization as part of `Alembic upgrade`
- All data transformations must complete before any application code executes
- Application code should **only handle the new format** (no backward compatibility needed)
- Assume migration has succeeded; design application code accordingly

**Why this matters for schema changes:**

```python
# ✅ OK - Application assumes new format
assessment_date = pkg_dict.get('assessment_date')  # Flat field
assessment_result = pkg_dict.get('assessment_result')

# ❌ WRONG - Defensive code handling both old & new formats
assessment = json.loads(pkg_dict.get('assessment', '[]'))  # Try repeating
if not assessment:
    # Fallback to flat fields (shouldn't happen!)
    assessment_date = pkg_dict.get('assessment_date')
```

Application code can be simple because the migration guarantees all data is in new format.

---

## Migration Basics

### File Structure

**Naming convention:** `<14-digit-timestamp>_<description>.py`

Timestamps are created automatically by Alembic:

```bash
# This command creates migration file with current timestamp
# (not applicable in our setup - manually create with ISO format)

# Manual creation example:
# 20261126_assessment_result_cardinality.py
#     ↑         ↑
#  date     snake_case description
```

### Template Migration

```python
"""Migration: Short description of change

Detailed description explaining:
1. What data is being transformed
2. Why (e.g., schema change, bug fix, optimization)
3. Impact on application code

For format-changing migrations, add post-deployment steps here.
"""

import logging
from alembic import op
from sqlalchemy import text

log = logging.getLogger(__name__)


def upgrade():
    """Apply the migration."""
    bind = op.get_bind()
    
    # Your SQL transformation here
    result = bind.execute(text("""
        UPDATE package
        SET extras = ...
        WHERE ...
    """))
    
    log.info(f"Migration applied: {result.rowcount} packages updated")


def downgrade():
    """Reverse the migration (if needed for rollback)."""
    bind = op.get_bind()
    
    # Reverse transformation
    bind.execute(text("""
        UPDATE package
        SET extras = ...
        WHERE ...
    """))
    
    log.info("Migration reversed")
```

### Key Imports

```python
from alembic import op
from sqlalchemy import text
import logging

log = logging.getLogger(__name__)
```

Do NOT import CKAN functions at module level (they won't be available during migration).

---

## Format-Changing Migrations

Format-changing migrations transform how data is stored (e.g., changing cardinality from 0..n → 0..1).

### Why Solr Cache Becomes Stale

CKAN API has two data sources:

```
API Request
  ↓
Try Solr cache first (fast)
  ↓ [cache hit]
Return cached data
  
  ↓ [cache miss/stale]
Fall back to database
  ↓
Return database data
```

When migration changes data format:

1. **Database updated** ✅ - Migration runs, data transforms immediately
2. **Solr cache unchanged** ❌ - Cache not auto-updated, retains old format
3. **API returns stale data** ❌ - Solr cache hit returns old format

**Example:**

```
Migration transforms assessment from repeating to flat:

BEFORE migration:
  Database: "assessment": "[{...}]"  (repeating)
  Solr cache: "assessment": "[{...}]" (repeating)

AFTER migration:
  Database: "assessment_date": "...", "assessment_result": "..."  ✅
  Solr cache: "assessment": "[{...}]"  ❌ STALE

API calls `package_show()`:
  → Checks Solr cache (hit!) → Returns old format "assessment": "[{...}]"
  → Users see old format even though database has new format!
```

### Solution: Post-Deployment Manual Step

Add clear instructions in migration docstring and code:

```python
"""Migration: Transform assessment format from repeating to flat

This migration transforms the assessment field from a repeating field:
  "assessment": "[{"assessment_date": "2026-01-01", "assessment_result": "..."}]"
To flat fields:
  "assessment_date": "2026-01-01"
  "assessment_result": "..."

NOTE: Solr search index must be manually rebuilt after deployment to sync
cached data with the new database format.

POST-DEPLOYMENT STEP (REQUIRED):

After this migration is deployed and the application starts, run:

    ckan search-index rebuild

This rebuilds the Solr cache from the updated database. If you skip this step,
the API will return old format until the cache is manually rebuilt.

TROUBLESHOOTING: If API responses show old format after deployment:

    ckan search-index rebuild
"""

def upgrade():
    bind = op.get_bind()
    
    # ... transformation SQL ...
    
    result = bind.execute(transform_query)
    updated_count = result.rowcount
    
    if updated_count > 0:
        log.info("""
        Migration complete: Assessment format transformed for %d packages
        
        POST-DEPLOYMENT: Rebuild search index to update Solr cache:
            ckan search-index rebuild
        
        If you see old format in API after deployment, run the command above.
        """, updated_count)
```

### Why Not Auto-Rebuild in Migration?

You might wonder: why not call `ckan search-index rebuild` from the migration?

**Answer: Because it won't work.**

The CKAN `rebuild()` function requires:
- Full CKAN plugin system initialized
- Model session loaded
- Configuration available
- Application context active

Alembic migrations run in **database-only mode**:
- No CKAN app context
- No plugin system
- No model session
- `rebuild()` import succeeds but calling it fails silently

If you try:

```python
# ✗ THIS DOESN'T WORK
from ckan.lib.search import rebuild  # ✅ Import works

def upgrade():
    bind = op.get_bind()
    # ... run transformation ...
    
    # ❌ This fails silently (exception caught, appears successful)
    rebuild()
```

The exception is caught and logged as a warning, making it appear like it succeeded when it actually failed.

**Better approach:** Manual post-deployment step (guaranteed to work, clearer to understand).

---

## Solr Cache Management

### Understanding Solr Cache

Solr stores indexed packages as JSON documents. When a package is indexed:

1. Package data converted to dict
2. Schema validated
3. Resulting dict cached in Solr

API calls check Solr cache first for performance.

### When Cache Becomes Stale

Cache becomes stale when:

1. **Data format changes** (migration transforms how data is stored)
2. **Field cardinality changes** (single → repeating or vice versa)
3. **Field types change** (URL → list of URLs, etc.)
4. **Raw database UPDATE** (migration UPDATEs database without notifying Solr)

Solr doesn't know about these changes until cache is manually cleared.

### How to Clear Cache

**Recommended: Post-deployment CLI command**

```bash
# After deployment completes:
ckan search-index rebuild

# This rebuilds entire Solr index from database
# Takes time but guaranteed to work
```

**Faster: Rebuild specific packages**

If only a few packages affected:

```bash
# Rebuild specific package by ID
ckan search-index rebuild <package-id>

# Rebuild multiple packages
for id in d5492f5a-9d50-4286-9374-4225cb0fe3d2 ...; do
    ckan search-index rebuild "$id"
done
```

**Manual: Clear via Solr API**

If CLI not available (requires Solr connection access):

```bash
# Clear specific package from Solr
curl -X POST -H "Content-Type: text/xml" \
  --data '<delete><id>d5492f5a-9d50-4286-9374-4225cb0fe3d2</id></delete>' \
  http://localhost:8983/solr/ckan/update

# Commit changes
curl -X POST -H "Content-Type: text/xml" \
  --data '<commit/>' \
  http://localhost:8983/solr/ckan/update
```

### Verifying Cache Is Fresh

Compare database with API response:

```bash
# 1. Check database directly
ckan-db query "SELECT extras FROM package WHERE id='<id>' LIMIT 1"
# Shows: {"assessment_date": "2026-01-01", ...}  (new format)

# 2. Check API response
curl http://localhost:5000/api/3/action/package_show?id=<id>
# Shows: {"assessment_date": "2026-01-01", ...}  (should match database)

# 3. If formats differ, Solr cache is stale
# → Run: ckan search-index rebuild
```

---

## Testing Migrations

### Pre-Deployment Testing

**On staging environment:**

1. Create test data with old format
2. Apply migration
3. Verify data transformed correctly
4. Test application code with new format
5. Verify API responses show new format
6. Run full test suite

### Manual Testing

```bash
# 1. Check record before migration
ckan-db query "SELECT id, extras FROM package WHERE ..." 

# 2. Apply migration
# (happens automatically on deployment)

# 3. Check record after migration
ckan-db query "SELECT id, extras FROM package WHERE ..."

# 4. Verify new format is correct
# 5. Run ckan search-index rebuild
# 6. Check API response
curl http://localhost:5000/api/3/action/package_show?id=...
```

### Unit Tests

Add tests to verify migration works:

```python
# tests/migration/test_assessment_cardinality.py

def test_assessment_format_transformed():
    """Test that assessment is transformed from repeating to flat"""
    # Setup: Create package with old format
    old_assessment = json.dumps([
        {"assessment_date": "2001-01-01", "assessment_result": "https://..."}
    ])
    
    # Insert package with old format
    db.execute(text("""
        INSERT INTO package (id, name, extras, state, type)
        VALUES (
            'test-id',
            'test-pkg',
            jsonb_build_object('assessment', :assessment),
            'active',
            'dataset'
        )
    """), {"assessment": old_assessment})
    
    # Apply migration (this would run automatically)
    # test_migration.upgrade()
    
    # Verify transformation
    result = db.execute(text("""
        SELECT extras FROM package WHERE id = 'test-id'
    """)).fetchone()
    
    extras = result[0]
    assert extras['assessment_date'] == '2001-01-01'
    assert extras['assessment_result'] == 'https://...'
    assert 'assessment' not in extras  # Old field removed
```

---

## Troubleshooting

### "API still shows old data format"

**Problem:** After migration deployed, API responses still show old format while database has new format.

**Solution:** Solr cache is stale. Rebuild it:

```bash
ckan search-index rebuild
```

**Verify before rebuilding:**

```bash
# Check database
ckan-db query "SELECT extras FROM package WHERE id='...' LIMIT 1"

# Check API
curl http://localhost:5000/api/3/action/package_show?id=...

# If formats differ → rebuild cache
```

### "Migration failed" or "Invalid SQL syntax"

**Common issues:**

1. **Missing `::jsonb` cast for repeating fields**
   - ❌ `extras->'field'->'subfield'`
   - ✅ `((extras->>'field')::jsonb)->0->>'subfield'`

2. **Using CKAN functions in migration**
   - ❌ `rebuild()` or other CKAN API calls
   - ✅ Plain SQL only

3. **Wrong JSONB operators**
   - ❌ `->` extracts JSONB (use for objects)
   - ✅ `->>` extracts text (use for strings)

4. **Accessing nested fields wrong way**
   - ❌ `extras['field']['subfield']` (Python dict syntax)
   - ✅ `extras->'field'->>'subfield'` (PostgreSQL JSONB syntax)

**Fix:** Review migration file against examples in [SCHEMA_CHANGES_CHECKLIST.md](./SCHEMA_CHANGES_CHECKLIST.md#8-database-migration).

### "Field 'xyz' not found in schema" after migration

**Problem:** Migration ran but application code can't find the field.

**Possible causes:**

1. All 8 layers not updated (see [README.md](./README.md#the-8-layers-tldv))
2. Schema generator not re-run → YAML not updated
3. Data converter not updated to match new format
4. Field name mismatch between migration and schema

**Solution:**

1. Run through [SCHEMA_CHANGES_QUICK_REFERENCE.md](./SCHEMA_CHANGES_QUICK_REFERENCE.md) checklist
2. Verify all 8 layers updated
3. Regenerate YAML schema: See [SCHEMA_CHANGES_CHECKLIST.md](./SCHEMA_CHANGES_CHECKLIST.md#8-database-migration)
4. Test application code with new format

### "Exception during migration but app still started"

**Problem:** Migration had an error but application started anyway (silent failure).

**Why:** Alembic may have swallowed the exception. Check application logs.

**Fix:**

1. Check container logs: `docker logs <container>`
2. Find the error message
3. Fix migration file
4. Redeploy (migrations re-run from latest successful version)

---

## Best Practices

### ✅ DO

- ✅ Add clear docstring explaining what changes and why
- ✅ Add logging for how many records affected
- ✅ Test on staging before production
- ✅ Add post-deployment notes if Solr cache affected
- ✅ Handle NULL/missing values gracefully
- ✅ Preserve data integrity (no data loss)
- ✅ Use descriptive migration file names
- ✅ Include both upgrade() and downgrade()

### ❌ DON'T

- ❌ Import CKAN functions at module level (use plain SQL instead)
- ❌ Call CKAN API functions from migration (they won't work)
- ❌ Forget `::jsonb` cast when accessing repeating fields
- ❌ Mix Python and SQL transformations (stick to SQL)
- ❌ Change multiple unrelated things in one migration (keep focused)
- ❌ Assume downgrade() isn't needed (always provide reversal)

---

## References

- [CKAN Migration Guide](https://docs.ckan.org/en/2.12/contributing/database-migrations.html)
- [PostgreSQL JSONB Operators](https://www.postgresql.org/docs/13/functions-json.html)
- [Schema Changes Checklist](./SCHEMA_CHANGES_CHECKLIST.md)
- [Schema Configuration Guide](./SCHEMA_CONFIGURATION.md)

