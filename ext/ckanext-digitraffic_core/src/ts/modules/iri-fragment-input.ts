import { initialize } from "../module-constructs/module";

type IriFragmentInputMO = {
}

export const IriFragmentInput: ckan.Module<HTMLFormElement, IriFragmentInputMO> = {
  initialize(this) {
    initialize.apply(this);
  }
}

ckan.module('digitraffic_core_iri_fragment_inputs', IriFragmentInput)