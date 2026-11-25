# Schema Configuration Guide

This document explains the key properties used in CKAN dataset schema files (like `mobility_dcat.yaml`).

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

**Default Behavior:**
- If `form_snippet` is **not defined** → Uses `text.html` (plain text input)
- If `form_snippet` is **explicitly set to `null`** → Field is hidden from forms (read-only in UI)
- If `form_snippet` is **set to a template name** → Uses that specific template

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
| **Independent?** | Yes - can be used alone | Mostly - but should match preset semantically |

**Key Point:** Just because a field has `preset: date` does NOT mean it will show a date picker. You MUST also specify `form_snippet: date.html` to get the date picker UI.

## Troubleshooting

### Form fields not appearing in create/edit form
**Problem:** Field is defined in schema but doesn't show in the form.

**Common Causes:**
1. `form_snippet: null` - Explicitly hidden from forms
2. Missing `form_snippet` and field uses default `text.html` (verify this is intentional)
3. Field is in the schema but not included in the form template's field_groups

**Solution:** Verify that:
- Field doesn't have `form_snippet: null`
- Field is included in the form template (e.g., `package_form.html`)
- Field has appropriate `form_snippet` for desired UI (e.g., `date.html` for dates)

### Form shows wrong input widget
**Problem:** Field displays as plain text input instead of specialized widget.

**Cause:** `preset` is defined but `form_snippet` is missing or uses default `text.html`.

**Solution:** Add appropriate `form_snippet` to match the preset:
```yaml
- field_name: my_date
  preset: date
  form_snippet: date.html   # Add this line!
```

## References

- [CKAN Scheming Documentation](https://github.com/ckan/ckanext-scheming)
- [CKAN Form Field Snippets](https://github.com/ckan/ckanext-scheming/tree/master/ckanext/scheming/templates/scheming/form_snippets)
