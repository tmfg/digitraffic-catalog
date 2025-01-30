import { initialize } from "../module-constructs/module";

export const IriFragmentInput = {
  initialize(this) {
    initialize.apply(this);
  }
} as ckan.Module<HTMLFormElement>

ckan.module('digitraffic_theme_iri_fragment_inputs', function ($) { return IriFragmentInput})