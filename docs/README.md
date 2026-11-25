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
