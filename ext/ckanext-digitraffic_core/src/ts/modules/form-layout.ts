import { initialize } from "../module-constructs/module";

type FormLayoutMO = {
  _handleMediaQueryChange: (event: MediaQueryListEvent | MediaQueryList) => void;
}

export const FormLayout: ckan.Module<HTMLFormElement, FormLayoutMO> = {
  initialize() {
    initialize.apply(this);

    const mediaQuery = window.matchMedia('(min-width: 768px)');

    mediaQuery.addEventListener('change', this._handleMediaQueryChange);
    this._handleMediaQueryChange(mediaQuery);
  },
  _handleMediaQueryChange(event: MediaQueryListEvent | MediaQueryList) {
    const leftWrapper = $('[data-form-layout-wrapper="left"]');
    const rightWrapper = $('[data-form-layout-wrapper="right"]');
    const isLeftWrapperExists = leftWrapper.length > 0;
    const isRightWrapperExists = rightWrapper.length > 0;

    if (event.matches) {
      if (!isLeftWrapperExists && !isRightWrapperExists) {
        const leftElements = $('.left-1, .left-2');
        const rightElements = $('.right-1, .right-2');
        const wrapperFlexStyles = 'display: flex; flex-wrap: nowrap; gap: 1rem; flex-direction: column;'
        const leftWrapper = document.createElement('div');
        const rightWrapper = document.createElement('div');
        leftWrapper.setAttribute('data-form-layout-wrapper', 'left');
        rightWrapper.setAttribute('data-form-layout-wrapper', 'right');
        leftWrapper.style = wrapperFlexStyles + ' grid-area: left-1-start / left-1-start / left-2-end / left-2-end;';
        leftElements.wrapAll(leftWrapper);
        rightWrapper.style = wrapperFlexStyles + ' grid-area: right-1-start / right-1-start / right-2-end / right-2-end;';
        rightElements.wrapAll(rightWrapper);
      }
    } else {
      if (isLeftWrapperExists && isRightWrapperExists) {
        leftWrapper.children().unwrap();
        rightWrapper.children().unwrap();
      }
    }
  }
}

ckan.module('digitraffic_core_form_layout', FormLayout)