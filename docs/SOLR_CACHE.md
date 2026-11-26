# Solr Cache Quick Reference

**TL;DR:** If API shows old data format after deployment, run:

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
| **Data format changes** | Migration transforms field structure | `ckan search-index rebuild` |
| **Field cardinality changes** | 0..n → 0..1 or vice versa | `ckan search-index rebuild` |
| **Field type changes** | Single URL → list of URLs | `ckan search-index rebuild` |
| **Raw database UPDATE** | Direct SQL without Solr notification | `ckan search-index rebuild` |

---

## How to Fix Stale Cache

### Quick Fix (Recommended)

```bash
# Rebuild entire Solr index from database
ckan search-index rebuild

# This takes time but is guaranteed to work
# Run after any deployment with format-changing migrations
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

Compare database with API response:

```bash
# 1. Check database
ckan-db query "SELECT extras FROM package WHERE id='<id>' LIMIT 1"
# Output: {"assessment_date": "2026-01-01", ...}  (new format)

# 2. Check API
curl http://localhost:5000/api/3/action/package_show?id=<id>
# Output: {"assessment_date": "2026-01-01", ...}  (should match above)

# 3. If formats differ:
#    - Database has: "assessment_date": "2026-01-01"  (new ✅)
#    - API shows:   "assessment": "[{...}]"  (old ❌)
# → Solr cache is stale!
# → Run: ckan search-index rebuild
```

---

## Why Migrations Don't Auto-Clear Cache

**Q: Why doesn't the migration automatically rebuild Solr?**

**A:** Because migrations run in database-only mode:

```python
# ✗ This doesn't work in migrations:
from ckan.lib.search import rebuild  # Import succeeds
rebuild()  # Calling fails silently (CKAN app not initialized)
```

Alembic migrations have no access to CKAN's plugin system or application context, so API functions don't work.

**Better approach:** Manual post-deployment step (guaranteed to work, clearer to understand).

---

## Best Practices

### ✅ DO

- ✅ **Always run `ckan search-index rebuild` after format-changing migrations** (required, not optional)
- ✅ Verify cache is fresh by comparing database vs API (see above)
- ✅ Document in migration when Solr rebuild is needed
- ✅ Test migrations on staging before production
- ✅ Add log messages in migrations telling deployers what to do
- ✅ For large datasets, rebuild specific packages instead of entire index (faster)

### ❌ DON'T

- ❌ Try to call `rebuild()` from migration code (it won't work)
- ❌ Assume cache auto-updates when you change database directly
- ❌ Deploy format-changing migrations without post-deployment plan
- ❌ Ignore warnings about stale cache (users will see inconsistent data)
- ❌ Wait for cache to auto-expire (Solr records don't auto-refresh from PostgreSQL)

---

## Troubleshooting

### "API still shows old data"

```bash
# 1. Verify cache is stale
ckan-db query "SELECT extras FROM package WHERE id='...' LIMIT 1"
# Shows new format? Good.

# 2. Check API
curl http://localhost:5000/api/3/action/package_show?id=...
# Shows old format? Cache is stale.

# 3. Fix it
ckan search-index rebuild

# 4. Verify fix
curl http://localhost:5000/api/3/action/package_show?id=...
# Should now show new format
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

