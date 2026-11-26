# Database Migrations Guide

This guide covers best practices for creating and deploying database migrations in the digitraffic catalog.

## Table of Contents

- [Quick Start](#quick-start)
- [What Migrations May Touch](#what-migrations-may-touch)
- [The Database Migration Guarantee](#the-database-migration-guarantee)
- [Migration Basics](#migration-basics)
- [Data Migrations on CKAN Tables](#data-migrations-on-ckan-tables)
- [Testing Migrations](#testing-migrations)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

**To create a migration:**

1. Generate the migration file with the CKAN CLI (do **not** create it by hand):

   ```bash
   ckan generate migration -p digitraffic_core -m 'short description of the change'
   ```

   Use the plugin name (`digitraffic_core`), not the extension name. The file is created in
   `ext/ckanext-digitraffic_core/ckanext/digitraffic_core/migration/digitraffic_core/versions/`
   with a generated revision ID, and contains empty `upgrade()` and `downgrade()` functions.
   See [CKAN best practices](https://docs.ckan.org/en/2.12/extensions/best-practices.html#use-migrations-when-introducing-new-models).
2. Implement `upgrade()` and `downgrade()` in the generated file (see [Migration Basics](#migration-basics); Alembic format: https://docs.ckan.org/en/2.12/contributing/database-migrations.html)
   - DDL (schema changes): Alembic `op.*` operations, only on the extension's own tables
   - Data changes in CKAN tables (e.g. converting stored dataset data): SQL `UPDATE`s, see [Data Migrations on CKAN Tables](#data-migrations-on-ckan-tables)
3. **Never do DDL on CKAN tables** (see [What Migrations May Touch](#what-migrations-may-touch))
4. Test on staging database before prod deployment

**To run migrations manually (e.g. locally):**

```bash
ckan db upgrade -p digitraffic_core     # apply pending migrations (idempotent)
ckan db downgrade -p digitraffic_core   # revert the plugin's latest migration
```

In deployed environments migrations run automatically during container initialization (before app starts).

**If migrations fail:**

1. Check application logs for error details
2. Fix the migration file
3. Re-deploy (migrations are re-run from latest applied version)

---

## What Migrations May Touch

**DDL (schema changes) and data changes are treated differently:**

| | Extension's own tables (`digitraffic_user_info`, `vaco_entry`, ...) | CKAN tables (`package`, `package_extra`, `resource`, `user`, `group`, ...) |
|---|---|---|
| **DDL** (create/alter/drop tables, columns, indexes, constraints, foreign keys) | ✅ Yes, with Alembic's `op.*` operations | ❌ **NEVER** |
| **Data changes** (`UPDATE`/`INSERT`/`DELETE` rows) | ✅ Yes | ✅ Yes, when stored data needs converting (e.g. rewriting `package.extras`), see [Data Migrations on CKAN Tables](#data-migrations-on-ckan-tables) |

- ✅ **DO** use Alembic's DDL operations (`op.create_table`, `op.add_column`, `op.create_index`, `op.drop_table`, ...) for the extension's own tables instead of hand-written SQL
- ❌ **NEVER** add/alter/drop columns, indexes, constraints or foreign keys on CKAN tables, and never create foreign keys from your tables to CKAN tables

When an extension table needs to refer to a CKAN entity, store its id as a plain column without a
foreign key (see `digitraffic_user_info.user` in the `f1fe0e480f69_user_fields.py` migration).

This follows CKAN's own guidance: an extension should not add columns to core tables or use foreign
keys against core tables
([best practices](https://docs.ckan.org/en/2.12/extensions/best-practices.html#don-t-edit-ckan-s-database-tables)).

---

## The Database Migration Guarantee

**All database migrations are GUARANTEED to complete successfully before the application starts.**

This principle is fundamental:

- Migrations run during container initialization as part of the Alembic upgrade
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

**Always generate migrations with the CKAN CLI:**

```bash
ckan generate migration -p digitraffic_core -m 'assessment result cardinality'
```

The command creates `versions/<revision-id>_<slug>.py` (e.g. `5d2b8e7c4a19_vaco_entry.py`),
where `<revision-id>` is a generated hex ID and `<slug>` is derived from the `-m` message.
It also fills in `revision` and `down_revision`, chaining the new migration to the current head.
Don't invent revision IDs or filenames by hand — a wrong `down_revision` breaks the migration chain.

### Template Migration

Edit the generated file: replace the docstring description and fill in `upgrade()`/`downgrade()`.
Keep the generated `revision`/`down_revision` values untouched.

```python
"""Short description of change

Revision ID: <generated>
Revises: <generated>
Create Date: <generated>

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "<generated>"
down_revision = "<generated>"
branch_labels = None
depends_on = None

MY_TABLE = "my_table"


def upgrade():
    op.create_table(
        MY_TABLE,
        sa.Column("id", sa.Integer, primary_key=True),
        # ids of CKAN entities are plain columns: no foreign keys to CKAN tables
        sa.Column("package_id", sa.Text, nullable=False),
        sa.Column("status", sa.Text),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("idx_my_table_package_id", MY_TABLE, ["package_id"])


def downgrade():
    op.drop_table(MY_TABLE)
```

Common Alembic DDL operations (all on the extension's own tables):

| Need | Operation |
|------|-----------|
| New table | `op.create_table(name, *columns)` |
| New column | `op.add_column(table, sa.Column(...))` |
| Change column | `op.alter_column(table, column, ...)` |
| Remove column | `op.drop_column(table, column)` |
| Index | `op.create_index(name, table, [columns])` / `op.drop_index(name, table_name=table)` |
| Remove table | `op.drop_table(name)` |

Always make `downgrade()` the exact reverse of `upgrade()`. See the existing migrations in
`versions/` (`f1fe0e480f69_user_fields.py`, `5d2b8e7c4a19_vaco_entry.py`) as references.

### Key Imports

```python
import sqlalchemy as sa
from alembic import op
from sqlalchemy import text  # only for data migrations (SQL UPDATEs)
```

Do NOT import CKAN functions in migrations (the CKAN app isn't loaded in the Alembic context, so
calls such as `ckan.lib.search.rebuild()` fail).

---

## Data Migrations on CKAN Tables

When the way dataset data is stored changes (e.g. a field's cardinality changes from 0..n to 0..1),
existing rows in CKAN tables must be converted. A migration may do this with SQL data changes
(`UPDATE` etc.) — but **never with DDL** on CKAN tables.

### CKAN 2.12+ storage

- Extras live in the JSONB `package.extras` column (the old `package_extra` table is no longer used): `{"key": "value", ...}`
- Use PostgreSQL JSONB operators: `->`, `->>`, `jsonb_build_object()`, `jsonb_build_array()`, `-` (delete key)
- Write SQL-based transformations, not Python loops over rows

**⚠️ Scheming stores repeating fields (0..n) as JSON-encoded STRINGS, not native JSONB arrays.**
In SQL, extract as text (`->>`) and cast to JSONB (`::jsonb`) before accessing array elements.
This is the most common migration bug.

```sql
-- ✗ Wrong: treats the string like an array
extras->'assessment'->0->>'date'

-- ✓ Correct: extract text, cast to JSONB, then access
(((extras->>'assessment')::jsonb)->0->>'date')
```

### Example: 0..n → 0..1 (repeating to flat fields)

```python
def upgrade():
    bind = op.get_bind()
    bind.execute(text("""
        UPDATE package
        SET extras = (
            (extras - 'assessment') || jsonb_build_object(
                'assessment_date', (((extras->>'assessment')::jsonb)->0->>'assessment_date'),
                'assessment_result', (((extras->>'assessment')::jsonb)->0->>'assessment_result')
            )
        )
        WHERE extras->>'assessment' IS NOT NULL
        AND jsonb_array_length(((extras->>'assessment')::jsonb)) > 0;
    """))
```

Notes:
- Operator precedence: `-` (delete key) binds tighter than `||`, so write `(extras - 'key') || ...`
- Keep the first element if several exist (and log a warning); skip NULL/missing values
- See `20261123_assessment_result_cardinality.py` for a complete example (counts logged, error handling)

### Example: 0..1 → 0..n in `downgrade()` (flat fields to repeating)

When restoring a repeating field, cast the constructed array to **TEXT** to restore the Scheming
storage format. Without the cast the old schema receives a native JSONB array instead of a JSON
string, and the data converter's `json.loads()` fails.

```python
def downgrade():
    bind = op.get_bind()
    bind.execute(text("""
        UPDATE package
        SET extras = (
            (extras - 'assessment_date' - 'assessment_result') || jsonb_build_object(
                'assessment',
                jsonb_build_array(
                    jsonb_build_object(
                        'assessment_date', extras->>'assessment_date',
                        'assessment_result', extras->>'assessment_result'
                    )
                )::text  -- CAST TO TEXT: critical
            )
        )
        WHERE extras->>'assessment_date' IS NOT NULL
           OR extras->>'assessment_result' IS NOT NULL;
    """))
```

### Search index after a data migration

Raw SQL updates the database but not the Solr index, so the API (which serves datasets from Solr)
keeps returning the old structure until the datasets are reindexed.

- **Local environments only:** run `ckan search-index rebuild` after running the migration (deployed environments don't need this manual step). See [SOLR_CACHE.md](./SOLR_CACHE.md)
- Don't try to rebuild from inside the migration: the CKAN app isn't loaded in the Alembic context, so `ckan.lib.search.rebuild()` fails
- Mention the local reindex in the migration docstring/log so local developers know about it:

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

**If the CKAN CLI is unavailable**

Arrange for an operator with access to the CKAN environment to run `ckan search-index rebuild <package-id>`. Do not delete Solr documents as a cache-refresh substitute: deleted datasets remain absent from search until CKAN reindexes them.

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

**On a local or staging database:**

1. For data migrations, create a few datasets in the old format first (and note a few values to compare)
2. Apply the migration: `ckan db upgrade -p digitraffic_core`
3. Verify: for DDL on your own tables, check with `psql` (e.g. `\d my_table`); for data migrations, check the converted rows (e.g. `SELECT id, extras FROM package WHERE ...`)
4. Revert it: `ckan db downgrade -p digitraffic_core`, and verify the change is fully undone (data back in the old format, schema changes removed)
5. Apply it again to confirm `upgrade()` works after a `downgrade()`
6. For data migrations, rebuild the search index locally (`ckan search-index rebuild`) and check that the API returns the new format
7. Run the full test suite

---

## Troubleshooting

### "Migration failed" or "Invalid SQL syntax"

**Common issues:**

1. **Wrong plugin name:** `-p` takes the plugin name (`digitraffic_core`), not the extension name
2. **Broken revision chain:** a hand-written `revision`/`down_revision` doesn't match the current head. Generate the file with `ckan generate migration` and don't edit the revision identifiers
3. **Missing `::jsonb` cast for repeating fields**
   - ❌ `extras->'field'->'subfield'`
   - ✅ `((extras->>'field')::jsonb)->0->>'subfield'`
4. **Wrong JSONB operators:** `->` returns JSONB (use for objects), `->>` returns text (use for strings); in SQL use `extras->'field'->>'subfield'`, not Python dict syntax
5. **Using CKAN functions in migration** (e.g. `ckan.lib.search.rebuild()`): the CKAN app isn't loaded in the Alembic context. Use only Alembic/SQLAlchemy operations and plain SQL
6. **DDL on CKAN tables:** not allowed (see [What Migrations May Touch](#what-migrations-may-touch)); only data changes are
7. **`downgrade()` isn't the exact reverse of `upgrade()`:** `ckan db downgrade -p digitraffic_core` then fails or leaves leftovers
8. **Missing `::text` cast in `downgrade()`** when restoring a repeating field (see [Data Migrations on CKAN Tables](#data-migrations-on-ckan-tables))

### "API shows old data format"

After a data migration, this is a stale Solr search index, not a migration problem. Locally, run
`ckan search-index rebuild`. See [SOLR_CACHE.md](./SOLR_CACHE.md).

### "Field 'xyz' not found in schema" after a schema change

**Possible causes:**

1. All 8 layers not updated (see [README.md](./README.md#the-8-layers-tldr))
2. Schema generator not re-run → YAML not updated
3. Data converter not updated to match the new schema
4. Field name mismatch between the schema and the code

**Solution:**

1. Run through [SCHEMA_CHANGES_QUICK_REFERENCE.md](./SCHEMA_CHANGES_QUICK_REFERENCE.md) checklist
2. Verify all 8 layers updated
3. Regenerate the YAML schema (see [SCHEMA_CHANGES_CHECKLIST.md](./SCHEMA_CHANGES_CHECKLIST.md))

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

- ✅ Generate migrations with `ckan generate migration -p digitraffic_core -m '...'`
- ✅ Use Alembic's `op.*` DDL operations on the extension's own tables
- ✅ Store ids of CKAN entities as plain columns (no foreign keys to CKAN tables)
- ✅ Convert stored dataset data in CKAN tables with SQL data changes, and provide a matching `downgrade()`
- ✅ Handle NULL/missing values gracefully and avoid data loss
- ✅ Log how many rows were affected
- ✅ Note the local `ckan search-index rebuild` in the migration docstring/log for data migrations
- ✅ Test `upgrade()` and `downgrade()` locally with `ckan db upgrade/downgrade -p digitraffic_core`
- ✅ Keep each migration focused on one change

### ❌ DON'T

- ❌ **NEVER do DDL on CKAN tables** (`package`, `package_extra`, `resource`, `user`, ...): no new/changed/dropped columns, indexes, constraints or foreign keys
- ❌ Import or call CKAN functions in migrations (they won't work)
- ❌ Forget the `::jsonb` cast when reading repeating fields, or the `::text` cast when restoring them in `downgrade()`
- ❌ Hand-write migration filenames or revision IDs
- ❌ Change multiple unrelated things in one migration
- ❌ Skip `downgrade()`: always provide an exact reversal

---

## References

- [CKAN Migration Guide](https://docs.ckan.org/en/2.12/contributing/database-migrations.html)
- [CKAN extension best practices: migrations](https://docs.ckan.org/en/2.12/extensions/best-practices.html#use-migrations-when-introducing-new-models)
- [Alembic operations reference](https://alembic.sqlalchemy.org/en/latest/ops.html)
- [PostgreSQL JSON functions and operators](https://www.postgresql.org/docs/13/functions-json.html)
- [Schema Changes Checklist](./SCHEMA_CHANGES_CHECKLIST.md)
- [Schema Configuration Guide](./SCHEMA_CONFIGURATION.md)

