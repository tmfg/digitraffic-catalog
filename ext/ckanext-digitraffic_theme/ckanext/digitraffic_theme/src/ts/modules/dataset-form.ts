import { initialize } from "../module-constructs/module";
import {
  TOP_MOBILITY_THEMES,
  TOP_MOBILITY_THEMES_T,
  isTopMobilityTheme,
  SUB_MOBILITY_THEMES_T, MOBILITY_THEME_TREE, MOBILITY_THEME_LABELS
} from "../model/mobility-theme";

type DatasetFormWrapperState = {
  topMobilityTheme?: TOP_MOBILITY_THEMES_T
}

interface DatasetFormWrapperModule extends ckan.Module<HTMLSelectElement> {
  state: DatasetFormWrapperState,
  _stateListeners?: ((oldState: DatasetFormWrapperState, changedKeys: Set<keyof DatasetFormWrapperState>) => void)[]
}

const DatasetFormWrapper = {
  initialize(this) {
    initialize.apply(this);
    this.state = {
      topMobilityTheme: this._getInitialMobilityTheme()
    };

    const topMobilityThemeSelector = this._getTopMobilityThemeSelector()
    const subMobilityThemeSelector = this._getSubMobilityTHemeSelector()

    topMobilityThemeSelector.on('change', this._onTopMobilityThemeChanged)

    this._onStateUpdate(this._handleTopMobilityThemeChanged)
  },
  teardown: function() {
    this._stateListeners = undefined
  },
  _getInitialMobilityTheme(): TOP_MOBILITY_THEMES_T | undefined {
    const formMobilityTheme = this._getTopMobilityThemeSelector().val()
    if (isTopMobilityTheme(formMobilityTheme)) {
      return formMobilityTheme
    } else {
      return undefined
    }
  },
  _getTopMobilityThemeSelector(): JQuery<HTMLSelectElement> {
    return this.$("#field-mobility_theme")
  },
  _getSubMobilityTHemeSelector(): JQuery<HTMLSelectElement> {
    return this.$("#field-mobility_theme_sub")
  },
  _onTopMobilityThemeChanged(event) {
    console.log("Top mobility theme changed")
    const selectedMobilityTheme = event.target.value;
    console.log(`Selected mobility theme: ${selectedMobilityTheme}`)
    this._updateState({topMobilityTheme: selectedMobilityTheme})
  },
  _updateState(newState: Partial<DatasetFormWrapperState>) {
    console.log("Updating state...")
    const oldState = this.state
    this.state = {
      ...this.state,
      ...newState
    };
    const changedKeys = new Set()
    for (const key in oldState) {
      if (key in this.state) {
        // Check if an existing key's value has changed
        if (oldState[key] !== this.state[key]) {
          changedKeys.add(key)
        }
      // If the key was deleted
      } else {
        changedKeys.add(key)
      }
    }
    for (const key in this.state) {
      // If a new key was added
      if (!(key in oldState)) {
        changedKeys.add(key)
      }
    }
    console.log(`Old state: ${JSON.stringify(oldState)}`)
    console.log(`New state: ${JSON.stringify(this.state)}`)
    console.log(`Changed keys: ${JSON.stringify(changedKeys)}`)
    if (this._stateListeners) {
      for (const listener of this._stateListeners) {
        listener(oldState, changedKeys)
      }
    }
  },
  _onStateUpdate(fn: (oldState: DatasetFormWrapperState, changedKeys: Set<keyof DatasetFormWrapperState>) => void): ()=>void {
    if (this._stateListeners) {
      this._stateListeners.push(fn)
    } else {
      this._stateListeners = [fn]
    }
    return () => {
      if (this._stateListeners) {
        this._stateListeners = this._stateListeners.filter(listenerFn => listenerFn !== fn)
      }
    }
  },
  _handleTopMobilityThemeChanged(oldState: DatasetFormWrapperState, changedKeys: Set<keyof DatasetFormWrapperState>): void {
    console.log('handling top mobility theme changed')
    if (changedKeys.has("topMobilityTheme")) {
      const subThemeOptions = MOBILITY_THEME_TREE[this.state.topMobilityTheme].map(subTheme => {
        const option = document.createElement("option")
        option.value = subTheme
        option.text = MOBILITY_THEME_LABELS[subTheme]
        return option
      })
      const emptyOption = document.createElement("option")
      emptyOption.value = ""
      emptyOption.text = ""
      emptyOption.selected = true
      subThemeOptions.unshift(emptyOption)
      console.log(subThemeOptions)
      this._getSubMobilityTHemeSelector().empty().append(subThemeOptions)
    }
  }
} as DatasetFormWrapperModule

ckan.module('digitraffic_theme_dataset_form_wrapper', function ($) { return DatasetFormWrapper})