# Solr Cache Quick Reference

**TL;DR:** If the API shows data in an old format when running locally (e.g. after running a data migration, or switching to a branch that changes how a field is stored), run:

```bash
ckan search-index rebuild
```

---

## What is Solr Cache?

Solr is CKAN's search engine. It caches indexed packages as JSON for fast API responses.

```
API request for package data
  ↓
Check Solr cache (fast)
  ↓ [cache hit] → return cached data
  ↓ [cache miss] → query database
```

**Problem:** When database changes but cache doesn't, API returns stale data.

---

## When Does Cache Become Stale?

Cache becomes stale after:

| Scenario | Cause | Solution |
|----------|-------|----------|
| **Stored data format changes** | A data migration converts stored field structure (e.g. repeating → flat) with SQL while indexed datasets keep the old structure | `ckan search-index rebuild` |
| **Field cardinality changes** | 0..n → 0..1 or vice versa | `ckan search-index rebuild` |
| **Field type changes** | Single URL → list of URLs | `ckan search-index rebuild` |
| **Data changed outside CKAN** | Direct SQL without Solr notification | `ckan search-index rebuild` |

---

## How to Fix Stale Cache

### Quick Fix (Recommended)

```bash
# Rebuild entire Solr index from database
ckan search-index rebuild

# This takes time but is guaranteed to work
# Only needed in local environments
```

### Faster: Rebuild Specific Packages

```bash
# Rebuild one package
ckan search-index rebuild <package-id>

# Example:
ckan search-index rebuild d5492f5a-9d50-4286-9374-4225cb0fe3d2

# Rebuild multiple packages
for id in <id1> <id2> <id3>; do
    ckan search-index rebuild "$id"
done
```

---

## How to Detect Stale Cache

The API (`package_show`) serves datasets from the Solr index. If it returns a field in an old
structure that the current code no longer produces (e.g. a nested `assessment` list instead of flat
`assessment_date` / `assessment_result`), the index is stale:

```bash
curl http://localhost:5000/api/3/action/package_show?id=<id>
# Shows the old structure? → the Solr index is stale
# → Run: ckan search-index rebuild
# → Call the API again: it should now show the new structure
```

---

## Why Migrations Don't Reindex

A data migration updates rows in CKAN's tables with SQL (see [DATABASE_MIGRATIONS.md](./DATABASE_MIGRATIONS.md)),
which doesn't notify Solr, so indexed datasets keep their old structure. The migration can't reindex
by itself either: calling CKAN's `rebuild()` from a migration doesn't work, because the CKAN app
isn't loaded in the Alembic context:

```python
# ✗ This doesn't work in migrations:
from ckan.lib.search import rebuild  # Import succeeds
rebuild()  # Calling fails (CKAN app not initialized)
```

Reindex manually with the CLI when running locally.

---

## Best Practices

### ✅ DO

- ✅ **Run `ckan search-index rebuild` locally when the API shows data in an old structure** (not needed in deployed environments)
- ✅ For large datasets, rebuild specific packages instead of the entire index (faster)

### ❌ DON'T

- ❌ Try to call `rebuild()` from migration code (it won't work)
- ❌ Assume the index updates when data changes outside CKAN
- ❌ Wait for cache to auto-expire (Solr records don't auto-refresh from PostgreSQL)

---

## Troubleshooting

### "API still shows old data"

```bash
# 1. Check API
curl http://localhost:5000/api/3/action/package_show?id=...
# Shows old structure? Index is stale.

# 2. Fix it
ckan search-index rebuild

# 3. Verify fix
curl http://localhost:5000/api/3/action/package_show?id=...
# Should now show new structure
```

### "search-index rebuild is slow"

If rebuilding entire index takes too long, rebuild only affected packages:

```bash
# Rebuild only the packages affected by the migration (faster)
for id in <id1> <id2> <id3>; do
    ckan search-index rebuild "$id"
done

# Run rebuild in background while continuing other work
nohup ckan search-index rebuild > rebuild.log 2>&1 &
```

**Important:** Stale Solr records do not auto-refresh from PostgreSQL. Waiting for cache expiration will NOT fix the stale data—you must run an explicit rebuild.

---

## References

- [DATABASE_MIGRATIONS.md](./DATABASE_MIGRATIONS.md) - Detailed migration guide
- [SCHEMA_CHANGES_CHECKLIST.md](./SCHEMA_CHANGES_CHECKLIST.md) - Schema change checklist
- [CKAN Search & Indexing](https://docs.ckan.org/en/2.12/maintain/index.html)

