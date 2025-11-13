import { initialize } from "../module-constructs/module";

type TemporalCoverageMO = {
  START_TIMESTAMP_TZ_CSS_QUERY: string;
  END_TIMESTAMP_TZ_CSS_QUERY: string;
  _getStartTimestampTZ: () => JQuery<HTMLElement>;
  _getEndTimestampTZ: () => JQuery<HTMLElement>;
  _moveToEnd: (element: JQuery<HTMLElement>) => void;
  _showNecessityLabels: () => void;
}

/**
 * This module makes UI changes to the temporal coverage form when JS is enabled.
 * The changes include:
 * - Show only one time zone field and move it to the end of the temporal coverage block.
 * - Show the necessity labels
 */
const TemporalConverage: ckan.Module<HTMLFormElement, TemporalCoverageMO> = {
  START_TIMESTAMP_TZ_CSS_QUERY: "#field-start_timestamp-tz",
  END_TIMESTAMP_TZ_CSS_QUERY: "#field-end_timestamp-tz",
  initialize(this) {
    initialize.apply(this);

    const startTimstampTZ = this._getStartTimestampTZ();
    const endTimestampTZ = this._getEndTimestampTZ();

    this._moveToEnd(startTimstampTZ);
    startTimstampTZ.find(this.START_TIMESTAMP_TZ_CSS_QUERY).on("change", (e: JQuery.TriggeredEvent) => {
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
}

ckan.module('digitraffic_core_temporal_coverage', TemporalConverage)
