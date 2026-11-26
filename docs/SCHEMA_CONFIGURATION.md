# Schema Configuration Guide

This document explains the key properties used in CKAN dataset schema files (like `mobility_dcat.yaml`). The schema format is provided by ckanext-scheming; see its [README](https://github.com/ckan/ckanext-scheming/blob/master/README.md) for the full reference of schema, field and preset options.

## Field Properties

### preset
**Purpose:** Define data validation and formatting rules for the field value.

**Examples:**
- `preset: date` → Validates that the input is a valid date
- `preset: url` → Validates that the input is a valid URL
- `preset: select` → Value must be one of predefined choices
- `preset: dataset_organization` → Special preset for organization selection

**Important:** The preset does NOT automatically determine how the form input widget is rendered. It only defines server-side validation/formatting.

### form_snippet
**Purpose:** Specify which Jinja2 template file to use for rendering the form input widget in create/edit forms.

**Default Behavior (Priority Order):**
1. **Explicit field-level `form_snippet`** (highest priority) → Uses that specific template
2. **Preset-provided default** → If the preset defines a default `form_snippet`, uses it
   - Example: `preset: url` provides `form_snippet: url_input.html` via `presets.json`
3. **Global default** (lowest priority) → Uses `text.html` (plain text input)
4. **Special case:** If `form_snippet` is **explicitly set to `null`** → Field is hidden from forms (read-only in UI)

**How to Determine the Actual Widget:**

To know what form widget will actually appear, check in this order:
1. Does the field have an explicit `form_snippet:` property? → Use that
2. Does the preset (in `presets.json`) provide a default `form_snippet`? → Use that
3. No explicit override and preset has no default? → Uses `text.html`

**Available form_snippet Templates:**
- `date.html` - Date picker input
- `datetime_tz.html` - DateTime with timezone selector
- `url_input.html` - URL input with HTML5 validation
- `email_input.html` - Email input
- `text.html` - Plain text input (default)
- `select.html` - Dropdown select
- `multi_select.html` - Multiple selection dropdown
- `fluent_text.html` - Multi-language text input
- `fluent_textarea.html` - Multi-language textarea
- `repeating_subfields.html` - Complex field with repeating sub-fields
- `organization.html` - Organization selector
- `rights_holder_organization.html` - Rights holder organization selector
- `dataset_reference_select.html` - Dataset reference selector

**Example:** A field with both `preset` and `form_snippet`:
```yaml
- field_name: assessment_date
  preset: date              # Server-side: validate it's a valid date
  form_snippet: date.html   # UI: show a date picker widget
```

### display_snippet
**Purpose:** Specify which Jinja2 template to use for rendering the field value in read-only view (dataset detail page).

**Default:** Uses the display template matching the field type.

**Example:**
```yaml
display_snippet: custom_display.html
```

## Common Configuration Patterns

### Date Input Field
```yaml
- field_name: event_date
  label: Event Date
  preset: date
  form_snippet: date.html         # Show date picker in form
  display_snippet: date.html      # Display formatted date in view
  required: false
```

### URL Input Field
```yaml
- field_name: website_url
  label: Website URL
  preset: url
  form_snippet: url_input.html    # Show URL input in form
  required: false
```

### Hidden Field (Read-only)
```yaml
- field_name: internal_id
  form_snippet: null              # Hidden from create/edit forms
  display_snippet: text.html      # But visible in read-only view
```

### Multi-language Text Field
```yaml
- field_name: title_translated
  preset: fluent_core_translated
  form_snippet: fluent_text.html  # Multi-language text input
```

## Important Design Principle

**`preset` and `form_snippet` serve different purposes:**

| Aspect | preset | form_snippet |
|--------|--------|--------------|
| **Purpose** | Data validation/formatting | Form widget rendering |
| **Applied** | Server-side | Client-side (template) |
| **Example** | `date` = validate ISO date | `date.html` = show date picker |
| **Independent?** | Yes - can be used alone | Depends on preset |

**Key Points:**

1. **Presets can provide default widgets via `presets.json`**
   - Preset `url` includes default `form_snippet: url_input.html`
   - You don't need to repeat it in every field—just use `preset: url`
   - This keeps schema DRY (Don't Repeat Yourself)

2. **Field-level `form_snippet` overrides preset defaults**
   - If you add `form_snippet: text.html` to a field with `preset: url`, the field will use `text.html` instead of `url_input.html`
   - Only override preset defaults when you have a specific reason

3. **Not all presets provide default widgets**
   - Custom presets (validators only) may not specify a `form_snippet`
   - In those cases, you must explicitly add `form_snippet` to the field

**Example:**

```yaml
# Simple: Preset provides everything
- field_name: website_url
  preset: url
  # form_snippet not needed—preset provides url_input.html

# Override: Explicitly change the widget
- field_name: website_url
  preset: url
  form_snippet: text.html   # Override: now uses plain text instead

# Custom: Preset has no default widget
- field_name: custom_field
  preset: my_custom_validator
  form_snippet: text.html   # Must be explicit here
```

## Troubleshooting

### Form fields not appearing in create/edit form
**Problem:** Field is defined in schema but doesn't show in the form.

**Common Causes:**
1. `form_snippet: null` - Explicitly hidden from forms
2. Field is in the schema but not included in the form template's field_groups
3. Field hidden by JavaScript or conditional logic in the template

**Solution:** Verify that:
- Field doesn't have `form_snippet: null`
- Field is included in the form template (e.g., `package_form.html`)
- Field doesn't have conditional visibility rules in templates

### Form shows wrong input widget
**Problem:** Field displays as plain text input (or unexpected widget) instead of the expected specialized widget.

**Common Causes:**

1. **Explicit field-level `form_snippet` overrides preset default**
   - If you add `form_snippet: text.html` to a field with `preset: url`, it will show as plain text instead of URL input
   - Solution: Remove the field-level `form_snippet` to use the preset's default

2. **Preset has no default `form_snippet` and needs explicit override**
   - Some presets (like custom validators) don't specify a default widget
   - By default, falls back to `text.html`
   - Solution: Add explicit `form_snippet` to match the preset semantically:
     ```yaml
     - field_name: my_date
       preset: date
       form_snippet: date.html   # Explicit override for custom preset
     ```

3. **Wrong preset chosen for the data**
   - Field uses `preset: text` (validation only) instead of a preset that provides a widget
   - Solution: Check `presets.json` to see which preset provides the desired widget and validators

**Example: URL Field Widget**

```yaml
# ✅ CORRECT - Preset provides form_snippet: url_input.html
- field_name: website_url
  label: Website URL
  preset: url                   # Includes form_snippet: url_input.html by default
  required: false
# → Will display URL input widget with validation

# ❌ WRONG - Explicit override prevents preset's default
- field_name: website_url
  label: Website URL
  preset: url
  form_snippet: text.html       # Overrides preset's url_input.html default!
  required: false
# → Will display plain text input (not desired!)

# ⚠️ CONDITIONAL - Custom preset without widget default
- field_name: custom_field
  label: Custom Field
  preset: my_custom_validator
  form_snippet: text.html       # Must explicitly specify (no preset default)
  required: false
# → Will display plain text input (intentional)
```

## References

- [ckanext-scheming README](https://github.com/ckan/ckanext-scheming/blob/master/README.md)
- [CKAN Form Field Snippets](https://github.com/ckan/ckanext-scheming/tree/master/ckanext/scheming/templates/scheming/form_snippets)
