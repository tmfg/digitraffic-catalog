# Catalog Documentation

This directory contains guides and documentation for maintaining and modifying the digitraffic catalog.

## ⚠️ Database Migration Guarantee

**All database migrations are GUARANTEED to complete successfully before the application starts.**

This principle applies to ANY database migration:
- Migrations run as part of container initialization (before app starts)
- All data transformations must complete before application code executes
- Application code should only handle the new format (no backward compatibility needed)
- Assume migration has succeeded; design accordingly

This simplifies application code—no fallback logic for old formats required.

---

## Schema Configuration & Field Types

**Reference guide for CKAN schema field configuration:**

### 📖 [SCHEMA_CONFIGURATION.md](./SCHEMA_CONFIGURATION.md)
Comprehensive guide to `preset` and `form_snippet` properties. Best for:
- Understanding field validation vs. form widget rendering
- Choosing the right form_snippet for your field type
- Troubleshooting form fields that don't appear or display incorrectly
- Common configuration patterns and examples
- Learning why `preset` and `form_snippet` serve different purposes

---

## Schema Changes

**Start here if you're modifying the data model or property cardinalities:**

### 📋 [SCHEMA_CHANGES_QUICK_REFERENCE.md](./SCHEMA_CHANGES_QUICK_REFERENCE.md)
Quick lookup for the 8 layers that need updating. Best for:
- Quick reminders during development
- Checking which files to modify
- Cardinality cheat sheet (single vs repeating patterns)
- Critical gotchas and verification checklist

### 📚 [SCHEMA_CHANGES_CHECKLIST.md](./SCHEMA_CHANGES_CHECKLIST.md)
Comprehensive step-by-step guide. Best for:
- First time changing cardinalities
- Understanding WHY each layer matters
- Code examples for each layer
- Common pitfalls and how to avoid them
- Complete example walkthrough
- **How to run the transpiler** to regenerate the schema
- Testing and verification after changes

---

## How to Use These Guides

### I need to change a property's cardinality...

1. **Read:** [SCHEMA_CHANGES_QUICK_REFERENCE.md](./SCHEMA_CHANGES_QUICK_REFERENCE.md) - 2 min overview
2. **Follow:** [SCHEMA_CHANGES_CHECKLIST.md](./SCHEMA_CHANGES_CHECKLIST.md) - step-by-step guide
3. **Verify:** Use the verification checklist at the end

### I want to understand the architecture...

Read [SCHEMA_CHANGES_CHECKLIST.md](./SCHEMA_CHANGES_CHECKLIST.md) for the complete overview section and architectural diagram.

### I keep forgetting what to update...

Bookmark [SCHEMA_CHANGES_QUICK_REFERENCE.md](./SCHEMA_CHANGES_QUICK_REFERENCE.md) - it's designed as a reference card.

---

## Common Issues & Troubleshooting

### API Returns Old Data Format After Migration (local environment)

**Symptom:** When running locally after a data migration, API responses show a field in an old structure while the database contains the new one.

**Example:** A migration transforms `assessment` from a nested repeating field to flat fields (`assessment_date`, `assessment_result`), but `package_show()` API still returns the nested format for datasets indexed earlier.

**Root Cause:** The Solr search index is stale. The migration updates the database with SQL, but the API serves datasets from the Solr index by default for performance, and the index isn't updated by the migration.

**Solution (local environments only):**

```bash
ckan search-index rebuild

# This rebuilds the Solr index from the database
# API will then return the new format
```

**How to verify the issue:**

```bash
# 1. Check API: does it show the old structure?
curl http://localhost:5000/api/3/action/package_show?id=<dataset-id>

# 2. If so, rebuild the index and check again
ckan search-index rebuild
```

**Learn more:** See [SOLR_CACHE.md](./SOLR_CACHE.md) for detailed troubleshooting and cache management.

---

### "Field not found" Errors in Forms After Migration

**Symptom:** After deploying schema changes, form submission fails with validation errors about missing fields.

**Root Cause:** Form template, schema definition, or data model layers got out of sync. All 8 layers (see below) must be aligned.

**Solution:**

1. Check [SCHEMA_CHANGES_QUICK_REFERENCE.md](./SCHEMA_CHANGES_QUICK_REFERENCE.md) - run through checklist
2. Verify all 8 layers updated (see "The 8 Layers" section below)
3. Run tests to catch mismatches: `pytest -v`

---

## Migration Guides

### 📚 [DATABASE_MIGRATIONS.md](./DATABASE_MIGRATIONS.md)

Guide to database migrations. Best for:
- Creating new migrations with `ckan generate migration`
- Knowing what migrations may touch: data changes in CKAN tables are fine, DDL on CKAN tables never
- Using Alembic DDL operations for the extension's own tables
- Converting stored dataset data (JSONB `package.extras`)
- Troubleshooting migration failures
- Testing migrations locally

### ⚡ [SOLR_CACHE.md](./SOLR_CACHE.md)

Quick reference for Solr search index cache. Best for:
- Quick fix when API shows old data: `ckan search-index rebuild`
- Understanding why cache becomes stale
- Detecting stale cache in a local environment

---

## The 8 Layers (TL;DR)

When changing property cardinalities, you must update these **in order**:

1. **Schema Generator** - `dcat_schema_transpiler/.../classes/`
2. **YAML Schema** - `mobility_dcat.yaml`
3. **Python Model** - `dataset.py` class definitions
4. **RDF Triples** - `dataset.py` `to_rdf_triples()` method
5. **Data Converter** - `mobility_data.py`
6. **Search Index** - `search.py` configuration
7. **DB Migration** - `migration/versions/`
8. **Tests** - Update test assertions

**Critical rule:** All 8 must be aligned. Missing even one breaks the system.

---

## Example: Quality Annotations (0..1 → 0..n)

The cardinality changes made in this catalog serve as a worked example:

- Quality descriptions changed from single URL to multiple URLs
- Assessment results changed from multiple to single
- Both examples are documented step-by-step in SCHEMA_CHANGES_CHECKLIST.md

This work was completed Nov 2024 to align with mobilityDCAT-AP v1.1.0 spec.

---

## Related Documentation

- **mobilityDCAT-AP Spec:** https://w3id.org/mobilitydcatap/mobilityDCAT-AP_v1.1.0.html
- **CKAN Schema:** https://docs.ckan.org/en/ckan-2.9.0/maintaining/index.html
- **DCAT Schema Transpiler:** See `dcat_schema_transpiler/README.md`
- **Database Migrations:** See migration files in `ext/.../migration/`

---

## Questions?

If something is unclear:

1. Check the quick reference or checklist for similar examples
2. Review the code examples in SCHEMA_CHANGES_CHECKLIST.md
3. Look at how quality_description or assessment were changed (Nov 2024 commits)
4. Ask the team
