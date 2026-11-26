# Schema Changes Quick Reference

**TL;DR:** When changing property cardinalities, update **8 layers** in this order.

---

## ⚠️ Model Consistency Principle

**CRITICAL:** When a property's structure changes (cardinality, storage format, HTML representation), ALL models must be updated simultaneously. Models exist in multiple layers:

- **Schema Definition** (YAML) — field structure
- **Python Runtime** — type annotations
- **Display HTML** — nested vs flat rows
- **Page Object Readback** (E2E) — locator patterns and parsing logic ← Often forgotten!
- **Database** — JSONB structure
- **RDF Output** — triple cardinality

**If these don't match, tests will fail silently.** For structural changes, **immediately verify page-object models after updating display templates.**

**Reference example:** [SCHEMA_CHANGES_CHECKLIST.md § Critical Principle: Model Consistency Across All Layers](./SCHEMA_CHANGES_CHECKLIST.md#-critical-principle-model-consistency-across-all-layers) — Assessment property case study.

---

## 📌 CKAN 2.12+ Database Structure

**Extras are now stored in JSONB column, not separate table:**

- **Old (CKAN <2.12):** `package_extra` table with id, package_id, key, value, state columns
- **New (CKAN 2.12+):** `package.extras` JSONB column with flat `{"key": "value"}` structure

**Migration implications:**
- Use PostgreSQL JSONB operators: `->`, `->>`, `jsonb_build_object()`, `jsonb_build_array()`
- Write SQL-based data migrations, not Python loops
- **Data changes in CKAN tables are allowed; DDL on CKAN tables is NEVER allowed** (no new/altered/dropped columns, indexes, constraints, foreign keys on `package`, `package_extra`, ...)
- Use Alembic's `op.*` DDL operations only for the extension's own tables
- Example: https://github.com/ckan/ckan/blob/master/ckan/migration/versions/106_12d64978ab44_faster_extras.py

**⚠️ CRITICAL: Repeating fields are stored as JSON-encoded STRINGS:**
- Repeating properties (0..n cardinality) are NOT stored as native JSONB arrays
- They are stored as text strings containing JSON: `"[{...}]"`
- **Must use `::jsonb` cast** before accessing array: `((extras->>'field')::jsonb)->`
- This is the most common database migration bug

See: [SCHEMA_CHANGES_CHECKLIST.md § CRITICAL: Scheming stores repeating fields as JSON-encoded STRINGS](./SCHEMA_CHANGES_CHECKLIST.md#-critical-scheming-stores-repeating-fields-as-json-encoded-strings)

---

---

## The 10 Layers (in dependency order)

| # | Layer | File(s) | Action |
|---|-------|---------|--------|
| 1 | **Schema Generator** | `dcat_schema_transpiler/.../classes/<name>.py` | ✏️ **EDIT**: Modify `get_schema()` or `get_aggregate_schema()` |
| 2 | **YAML Schema** | `mobility_dcat.yaml` | 🔄 **AUTO-GENERATED**: No changes needed (transpiler generates) |
| 3 | **Python Model** | `dataset.py` | ✏️ **EDIT**: Update type definitions |
| 4 | **RDF Triples** | `dataset.py` `to_rdf_triples()` | ✏️ **EDIT**: Use list comprehension or conditional |
| 5 | **Data Converter** | `mobility_data.py` | ✏️ **EDIT**: Iterate or access as needed |
| 6 | **Form Templates** | `templates/.../package_form.html`, `field_groups.html` | ✏️ **EDIT**: Update field list in group definitions |
| 7 | **Display Templates** | `templates/.../additional_info.html`, `resource_read.html` | ✏️ **EDIT**: Update display snippets for grouped fields |
| 8 | **Search Index** | `search.py` | ✏️ **EDIT**: Add/remove from repeating fields list |
| 9 | **DB Migration** | `migration/.../versions/<revision>_<slug>.py` (generate with `ckan generate migration -p digitraffic_core -m '...'`) | ✏️ **EDIT**: Transform existing data between formats (SQL data changes). **Never DDL on CKAN tables** |
| 10 | **Tests** | Test files | ✏️ **EDIT**: Update assertions |

**Key:** ✏️ = Manual edits required | 🔄 = Auto-generated (don't edit directly)

---

## ⚠️ Critical: Vocabulary Properties

For properties using `SchemaChoiceVocabulary` or `SchemaVocabulary` subclasses
(e.g., `GeoreferencingMethod`, `TransportMode`, `Frequency`):

**Layer 5 (Data Converter) requires special handling:**

The vocabulary class constructor expects a **single IRI string**, not a list. For repeating properties, **iterate and create one object per IRI**:

✅ **CORRECT** (repeating vocabulary property):
```python
"georeferencing_method": [
    GeoreferencingMethod(entry)
    for entry in dataset_dict["georeferencing_method"]
]
```

❌ **INCORRECT**:
```python
"georeferencing_method": GeoreferencingMethod(dataset_dict["georeferencing_method"])
# TypeError: list is unhashable when vocabulary checks membership
```

**Example error symptom:** `TypeError: unhashable type: 'list'` during RDF export, occurring in vocabulary membership checking before the actual iteration loop runs.

**Reference implementations:**
- `transport_mode`: [mobility_data.py:405-410](/ext/ckanext-digitraffic_core/ckanext/digitraffic_core/model/mobility_data.py#L405)
- `spatial`: [mobility_data.py:413](/ext/ckanext-digitraffic_core/ckanext/digitraffic_core/model/mobility_data.py#L413)

---

## ⚠️ E2E Tests (Playwright/TypeScript)

For repeating properties displayed in the UI, E2E test consumers must be updated:

**Fixture:** Use arrays instead of scalars
```typescript
// Before
georeferencingMethod: GeoreferencingMethod.OTHER,

// After
georeferencingMethod: [GeoreferencingMethod.OTHER],
```

**Readback Parser:** Split rendered text and parse each value
```typescript
const methodText = await getTextContent(this.georeferencingMethod, 'georeferencingMethod');
const methodValues: GeoreferencingMethod[] = [];
if (methodText) {
  const methods = methodText
    .split(/(?=[A-Z])/)  // Split on capital letters
    .map(item => item.trim())
    .map(string => labelToGeoreferencingMethod(string));
  methodValues.push(...methods);
}
```

**Form Input:** Create `add*` method for multi-select
```typescript
async addGeoreferencingMethod(method: string): Promise<void> {
  await this.georeferencingMethodField.click();
  const option = await this.additionalInformationGroup
    .locator("span.label")
    .filter({ hasText: new RegExp(`^${method}$`) });
  await option.click();
  await this.georeferencingMethodField.click();  // Close field
}

// Loop through array in fillDataset
if (datasetInfo.optionalValues?.georeferencingMethod) {
  for (const method of datasetInfo.optionalValues.georeferencingMethod) {
    await this.addGeoreferencingMethod(georeferencingMethodLabels[method]);
  }
}
```

**Full details:** See [SCHEMA_CHANGES_CHECKLIST.md § Layer 7 - E2E Tests](./SCHEMA_CHANGES_CHECKLIST.md#-special-note-e2e-test-consumer-updates-for-repeating-properties)

---

## Cardinality Cheat Sheet

### Single Field (0..1)
```yaml
# YAML
my_field:
  field_name: my_field
  preset: url
  
# Python
my_field: NotRequired[str]

# RDF
if self.my_field:
    yield (self.uri, PREDICATE, URIRef(self.my_field))

# Converter
dataset["my_field"] = dataset_dict.get("my_field")

# Search
# (not in DATASET_FIELDS_WITH_REPEATING_SUBFIELDS)
```

### Repeating Field (0..n)
```yaml
# YAML
my_fields:
  field_name: my_fields
  form_blanks: 0
  repeating_subfields:
    - field_name: my_field
      preset: url
  
# Python
class MyField(TypedDict):
    my_field: str
my_fields: NotRequired[List[MyField]]

# RDF
for mf in (self.my_fields or []):
    yield (self.uri, PREDICATE, URIRef(mf["my_field"]))

# Converter
dataset["my_fields"] = [
    {"my_field": item.get("my_field")}
    for item in dataset_dict.get("my_fields", [])
    if item.get("my_field")
]

# Search
DATASET_FIELDS_WITH_REPEATING_SUBFIELDS = [
    "my_fields",
]
```

---

## Critical Gotchas

| Mistake | Symptom | Fix |
|---------|---------|-----|
| Forget schema generator update | Regeneration overwrites YAML | Update converter `get_schema()` or `get_aggregate_schema()` |
| Field name mismatch | Data doesn't flow between layers | Use same name in YAML, Python, and converter |
| Missing search config | Search returns incomplete results | Add/remove from `DATASET_FIELDS_WITH_REPEATING_SUBFIELDS` |
| No DB migration | Old data incompatible with new code | Write migration script with upgrade/downgrade |
| DDL on CKAN tables in a migration | Breaks CKAN's rules for extensions | Data changes in CKAN tables are fine; never add/alter/drop columns, indexes, constraints or foreign keys on them |
| Wrong RDF pattern | Export generates invalid triples | List comprehension (0..n) vs conditional (0..1) |
| Validator mismatch | Form accepts/rejects wrong data | Update validators for new cardinality |

---

## Database Migration Pattern

**Data transformation pattern (example: 0..n → 0..1):**

```python
# Before: list of assessments (database storage)
assessment = [
    {"date": "2024-01-01", "result": "pass"},
    {"date": "2024-01-02", "result": "fail"},
]

# After: single assessment (database storage, flat extras)
assessment_date = "2024-01-01"
assessment_result = "pass"
# Note: If multiple exist, keep first. Log warning if records dropped.
```

**Key points:**
- Migration handles data transformation (SQL data changes on CKAN tables are fine)
- **Never DDL on CKAN tables**; use Alembic `op.*` DDL only for the extension's own tables
- Application code assumes new format always exists
- No backward compatibility needed—migration is prerequisite
- Local environments only: run `ckan search-index rebuild` afterwards (see [SOLR_CACHE.md](./SOLR_CACHE.md))

**Design principle (applies to any database migration):**

Migrations are GUARANTEED to complete successfully before the application starts.
- Database is fully transformed before any application code runs
- Design all application layers to handle the new format only
- Never implement fallback logic for old formats
- Assume migration is a successful prerequisite

See [DATABASE_MIGRATIONS.md](./DATABASE_MIGRATIONS.md) for details.

---

## Verification Checklist

Before deploying:

- [ ] Schema generator syntax OK: `python3 -m py_compile <file>`
- [ ] YAML valid: Load schema in CKAN test environment
- [ ] Python syntax OK: `python3 -m py_compile <file>`
- [ ] Types consistent: Same name across model, converter, YAML
- [ ] RDF correct: Validate generated triples match spec
- [ ] Search works: Index dataset, find by field value
- [ ] DB migration tested: `ckan db upgrade/downgrade -p digitraffic_core` locally, verify data integrity
- [ ] No data loss: Compare pre/post migration counts

---

## Related Files

- Full checklist: [SCHEMA_CHANGES_CHECKLIST.md](./SCHEMA_CHANGES_CHECKLIST.md)
- mobilityDCAT-AP spec: https://w3id.org/mobilitydcatap/mobilityDCAT-AP_v1.1.0.html
- CKAN schema docs: https://docs.ckan.org/en/ckan-2.9.0/maintaining/index.html
