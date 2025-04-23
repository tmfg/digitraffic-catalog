import { initialize } from "../module-constructs/module";

/**
 * This module makes UI changes to the temporal coverage form when JS is enabled.
 * The changes include:
 * - Show only one time zone field and move it to the end of the temporal coverage block.
 * - Show the necessity labels
 */
const TemporalConverage = {
  START_TIMESTAMP_TZ_CSS_QUERY: "#field-start_timestamp-tz",
  END_TIMESTAMP_TZ_CSS_QUERY: "#field-end_timestamp-tz",
  initialize(this) {
    initialize.apply(this);

    const startTimstampTZ = this._getStartTimestampTZ();
    const endTimestampTZ = this._getEndTimestampTZ();

    console.log("startTimestampTZ", startTimstampTZ);

    this._moveToEnd(startTimstampTZ);
    startTimstampTZ.find(this.START_TIMESTAMP_TZ_CSS_QUERY).on("change", (e: JQuery.TriggeredEvent) => {
      console.log("startTimestampTZ", e.target.value);
      const value = e.target.value;
      endTimestampTZ.find(this.END_TIMESTAMP_TZ_CSS_QUERY).val(value);
    });
    endTimestampTZ.hide();
    this._showNecessityLabels();
  },
  _getStartTimestampTZ(): JQuery<HTMLElement> {
    return this.$(".datetime-row").find('.datetime-field').has(this.START_TIMESTAMP_TZ_CSS_QUERY);
  },
  _getEndTimestampTZ(): JQuery<HTMLElement> {
    return this.$(".datetime-row").find('.datetime-field').has(this.END_TIMESTAMP_TZ_CSS_QUERY);
  },
  _moveToEnd(element: JQuery<HTMLElement>) {
    element.appendTo(this.el);
  },
  _showNecessityLabels() {
    const hidingElements = this.$(".hide-necessity")
    if (hidingElements.length) {
      hidingElements.removeClass("hide-necessity");
    }
  }

} as unknown as ckan.Module<HTMLDivElement>;

ckan.module('digitraffic_theme_temporal_coverage', function (_) { return TemporalConverage})