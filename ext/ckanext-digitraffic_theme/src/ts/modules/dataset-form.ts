import { initialize } from "../module-constructs/module";
import {
  TOP_MOBILITY_THEMES_T,
  isTopMobilityTheme,
  SUB_MOBILITY_THEMES_T, MOBILITY_THEME_TREE, MOBILITY_THEME_LABELS, SUB_MOBILITY_THEMES
} from "../model/mobility-theme";

type DatasetFormWrapperState = {
  topMobilityTheme?: TOP_MOBILITY_THEMES_T
  subMobilityThemeSelector?: JQuery<HTMLSelectElement>
  subMobilityThemeSelectorParent?: JQuery<HTMLSelectElement>
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

    topMobilityThemeSelector.on('change', this._onTopMobilityThemeChanged)

    this._onStateUpdate(this._handleTopMobilityThemeChanged)
    this._subThemeSelectorViewUpdate(undefined, this.state)
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
  _getInitialSubMobilityTheme(): SUB_MOBILITY_THEMES_T | undefined {
    const formSubMobilityTheme = this._getInitialSubMobilityThemeSelector().val();
    if (SUB_MOBILITY_THEMES.has(formSubMobilityTheme)) {
      return formSubMobilityTheme as SUB_MOBILITY_THEMES_T;
    } else {
      return undefined;
    }
  },
  _getTopMobilityThemeSelector(): JQuery<HTMLSelectElement> {
    return this.$("#field-mobility_theme")
  },
  // the existing value of mobility theme sub category is stored in a separate element for the use of this script
  _getInitialSubMobilityThemeSelector(): JQuery<HTMLSelectElement> {
    return this.$("#mobility_theme_sub_value")
  },
  _getSubMobilityThemeSelector(): JQuery<HTMLSelectElement> {
    return this.$("#field-mobility_theme_sub")
  },
  _onTopMobilityThemeChanged(event) {
    const selectedMobilityTheme = event.target.value;
    this._mergeState({topMobilityTheme: selectedMobilityTheme})
  },
  _stateChangedKeys(oldState: DatasetFormWrapperState, newState: DatasetFormWrapperState) {
    const changedKeys = new Set()
    for (const key in oldState) {
      if (key in newState) {
        // Check if an existing key's value has changed
        if (oldState[key] !== newState[key]) {
          changedKeys.add(key)
        }
        // If the key was deleted
      } else {
        changedKeys.add(key)
      }
    }
    for (const key in newState) {
      // If a new key was added
      if (!(key in oldState)) {
        changedKeys.add(key)
      }
    }
    return changedKeys
  },
  _triggerListeners(oldState: DatasetFormWrapperState, changedKeys) {
    if (this._stateListeners) {
      for (const listener of this._stateListeners) {
        listener(oldState, changedKeys)
      }
    }
  },
  _updateState(newState: DatasetFormWrapperState) {
    const oldState = this.state
    this.state = newState

    const changedKeys = this._stateChangedKeys(oldState, newState)
    this._triggerListeners(oldState, changedKeys)
    return newState
  },
  _mergeState(partialNewState: Partial<DatasetFormWrapperState>) {
    const oldState = this.state

    const newState = {
      ...this.state,
      ...partialNewState
    };
    this.state = newState

    const changedKeys = this._stateChangedKeys(oldState, newState)
    this._triggerListeners(oldState, changedKeys)
    return newState
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
    if (changedKeys.has("topMobilityTheme")) {
      this._subThemeSelectorViewUpdate(oldState, this.state)
    }
  },
  _subThemeSelectorViewUpdate(oldState: DatasetFormWrapperState | undefined, state: DatasetFormWrapperState) {
    function isSubMobilityThemeSelectorRemoved(state: DatasetFormWrapperState): state is DatasetFormWrapperState & Required<Pick<DatasetFormWrapperState, "subMobilityThemeSelector"|"subMobilityThemeSelectorParent">> {
      return typeof state === 'object' && !!state.subMobilityThemeSelectorParent && !!state.subMobilityThemeSelector
    }

    function _buildSubThemeOptions(subThemes: SUB_MOBILITY_THEMES_T[], selectedSubTheme?: SUB_MOBILITY_THEMES_T) {
      const subThemeOptions = subThemes.map(subTheme => {
        const option = document.createElement("option")
        option.value = subTheme
        const lang = $("html").attr("lang");
        option.text = MOBILITY_THEME_LABELS[subTheme][lang] ?? MOBILITY_THEME_LABELS[subTheme]["en"]
        if (subTheme === selectedSubTheme) {
          option.selected = true;
        }
        return option
      })
      const emptyOption = document.createElement("option")
      emptyOption.value = ""
      emptyOption.text = ""
      if (!selectedSubTheme) {
        emptyOption.selected = true;
      }
      subThemeOptions.unshift(emptyOption)
      subThemeOptions.sort((a, b) => a.text.localeCompare(b.text))

      return subThemeOptions
    }
    function _changeSubThemeOptions(subThemeOptions: HTMLOptionElement[]) {
      this._getSubMobilityThemeSelector().empty().append(subThemeOptions)
    }

    function _toggleSubMobilityThemeVisibility() {
      const formGroup = this._getSubMobilityThemeSelector().parentsUntil('form')
        .filter('div.form-group')
      const display = formGroup.css('display')
      const isVisible = display !== 'none'

      if (isVisible) {
        formGroup.css('display', 'none')
      } else {
        formGroup.css('display', '')
      }
    }

    function _removeSubThemeSelector() {
      if (!(isSubMobilityThemeSelectorRemoved(state))) {
        _toggleSubMobilityThemeVisibility.apply(this)
        const subMobilityThemeSelectorParent = this._getSubMobilityThemeSelector().parent()
        const subMobilityThemeSelector = this._getSubMobilityThemeSelector().detach()
        this._mergeState({
          subMobilityThemeSelector: subMobilityThemeSelector,
          subMobilityThemeSelectorParent: subMobilityThemeSelectorParent,
        })
      }
    }

    function _addSubThemeSelector() {
      if (isSubMobilityThemeSelectorRemoved(state)) {
        state.subMobilityThemeSelectorParent.append(state.subMobilityThemeSelector)
        _toggleSubMobilityThemeVisibility.apply(this)
        const currentState = {...state}
        const keysToRemove = new Set(["subMobilityThemeSelector", "subMobilityThemeSelectorParent"])
        const newState = Object.keys(currentState).reduce((state, key) => {
          if (!(keysToRemove.has(key))) {
            state[key] = currentState[key]
          }
          return state
        }, {})
        this._updateState(newState)
      }
    }
    const isInitialRender = oldState === undefined
    const isMobilityThemeChanged = oldState?.topMobilityTheme !== state.topMobilityTheme
    const isRenderNeeded = isInitialRender || isMobilityThemeChanged
    if (isRenderNeeded) {
      const subThemes = MOBILITY_THEME_TREE[state.topMobilityTheme]
      const initialSubMobilityTheme = this._getInitialSubMobilityTheme();
      if (subThemes?.length > 0) {
        _addSubThemeSelector.apply(this)
        const subThemeOptions = _buildSubThemeOptions.apply(this, [subThemes, initialSubMobilityTheme])
        _changeSubThemeOptions.apply(this, [subThemeOptions])
      } else {
        _removeSubThemeSelector.apply(this)
      }
    }
  }
} as DatasetFormWrapperModule

ckan.module('digitraffic_theme_dataset_form_wrapper', function ($) { return DatasetFormWrapper})