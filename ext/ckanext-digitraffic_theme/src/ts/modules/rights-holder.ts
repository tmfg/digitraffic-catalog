import { initialize } from "../module-constructs/module";

type RightsHolderMO = {
  _getTypeEl: () => JQuery<HTMLSelectElement>;
  _getIndex: () => number;
  _getAllFields: () => JQuery<HTMLElement>;
  _getTypeFields: (rightsHolderType: RightsHolderType) => JQuery<HTMLElement>;
  _getFields: (fieldNames: Set<string>) => JQuery<HTMLElement>;
  _getAllFieldNames: (i: number) => Set<string>;
  _getParentFormGroup: (el: JQuery<HTMLElement>) => JQuery<HTMLElement>;
  _onlyShowTypeFields: (rightsHolderType: RightsHolderType) => void;
}

enum RightsHolderType {
  ACADEMIA = "http://purl.org/adms/publishertype/Academia-ScientificOrganisation",
  COMPANY = "http://purl.org/adms/publishertype/Company",
  INDUSTRY_CONSORTIUM = "http://purl.org/adms/publishertype/IndustryConsortium",
  LOCAL_AUTHORITY = "http://purl.org/adms/publishertype/LocalAuthority",
  NATIONAL_AUTHORITY = "http://purl.org/adms/publishertype/NationalAuthority",
  NON_GOVERNMENTAL_ORGANIZATION = "http://purl.org/adms/publishertype/NonGovernmentalOrganisation",
  NON_PROFIT_ORGANIZATION = "http://purl.org/adms/publishertype/NonProfitOrganisation",
  PRIVATE_INDIVIDUAL = "http://purl.org/adms/publishertype/PrivateIndividual(s)",
  REGIONAL_AUTHORITY = "http://purl.org/adms/publishertype/RegionalAuthority",
  STANDARDISATION_BODY = "http://purl.org/adms/publishertype/StandardisationBody",
  SUPER_NATIONAL_AUTHORITY = "http://purl.org/adms/publishertype/SupraNationalAuthority"
}

const RightsHolder: ckan.Module<HTMLDivElement, RightsHolderMO>  = {
  initialize() {
    console.log("INITIALIZINIIINGNGN RIGHTS HOLDER")
    initialize.apply(this);

    const rightsHolderTypeField = this._getTypeEl()
    const rightsHolderType = rightsHolderTypeField.val() as RightsHolderType
    this._onlyShowTypeFields(rightsHolderType)
    rightsHolderTypeField.on("change", (event: JQuery.ChangeEvent) => {
      const selectedValue = event.target.value as RightsHolderType
      this._onlyShowTypeFields(selectedValue)
    })
  },
  _onlyShowTypeFields(rightsHolderType: RightsHolderType): void {
    const rightsHolderTypeFields = this._getTypeFields(rightsHolderType)
    const allFields = this._getAllFields()
    const fieldsToHide = allFields.not(rightsHolderTypeFields)
    const formGroupsToHide = fieldsToHide.map((_, el) => this._getParentFormGroup($(el))[0])
    const formGroupsToShow = rightsHolderTypeFields.map((_, el) => this._getParentFormGroup($(el))[0])

    formGroupsToHide.addClass("display-none")
    formGroupsToShow.removeClass("display-none")
  },
  _getTypeEl(): JQuery<HTMLSelectElement> {
    const index = this._getIndex()

    const rightsHolderTypeName = `rights_holder-${index}-type`
    const rightsHolderTypeEl = this.el.find<HTMLSelectElement>(`select[name='${rightsHolderTypeName}']`)
    if (rightsHolderTypeEl.length === 0) {
      throw new Error(`Rights holder type element not found for index ${index}`)
    }
    return rightsHolderTypeEl
  },
  _getIndex(): number {
    const rightsHolderEl = this.el.closest("[data-field='rights_holder']")
    if (rightsHolderEl.length !== 1) {
      throw new Error("Rights holder element not found")
    }

    const i = rightsHolderEl.attr("data-group-index")
    if (i === undefined) {
      throw new Error("Rights holder index not found")
    }
    return parseInt(i)
  },
  _getTypeFields(rightsHolderType: RightsHolderType): JQuery<HTMLElement> {
    const i = this._getIndex()
    const allFieldNames = this._getAllFieldNames(i)
    const organizationTypes = new Set([
        RightsHolderType.ACADEMIA,
        RightsHolderType.COMPANY,
        RightsHolderType.INDUSTRY_CONSORTIUM,
        RightsHolderType.LOCAL_AUTHORITY,
        RightsHolderType.NATIONAL_AUTHORITY,
        RightsHolderType.NON_GOVERNMENTAL_ORGANIZATION,
        RightsHolderType.NON_PROFIT_ORGANIZATION,
        RightsHolderType.REGIONAL_AUTHORITY,
        RightsHolderType.STANDARDISATION_BODY,
        RightsHolderType.SUPER_NATIONAL_AUTHORITY
        ])
    let typeFieldNames: Set<string> | undefined = undefined
    if (rightsHolderType === RightsHolderType.PRIVATE_INDIVIDUAL) {
      typeFieldNames = allFieldNames
    }
    if (organizationTypes.has(rightsHolderType)) {
      const excludedFields = new Set([
        `rights_holder-${i}-first_name`,
        `rights_holder-${i}-surname`,
        `rights_holder-${i}-workplace_homepage`,
      ])
      typeFieldNames = new Set([...allFieldNames].filter(item => !excludedFields.has(item)))
    }
    if (typeFieldNames === undefined) {
        throw new Error(`Rights holder type field names not found for type ${rightsHolderType}`)
    }
    return this._getFields(typeFieldNames)
  },
  _getAllFields(): JQuery<HTMLElement> {
    const i = this._getIndex()
    const allFieldNames = this._getAllFieldNames(i)
    return this._getFields(allFieldNames)
  },
  _getFields(fieldNames: Set<string>): JQuery<HTMLElement> {
    let fields = $()
    for (const fieldName of fieldNames) {
      const fieldEl = this.el.find(`[name='${fieldName}']`)
      if (fieldEl.length === 0) {
        throw new Error(`Rights holder field element not found for field ${fieldName}`)
      }
      fields = fields.add(fieldEl)
    }
    return fields
  },
  _getAllFieldNames(i: number): Set<string>  {
    return new Set([
      `rights_holder-${i}-type`,
      `rights_holder-${i}-name`,
      `rights_holder-${i}-first_name`,
      `rights_holder-${i}-surname`,
      `rights_holder-${i}-mbox`,
      `rights_holder-${i}-phone`,
      `rights_holder-${i}-thoroughfare`,
      `rights_holder-${i}-post_name`,
      `rights_holder-${i}-post_code`,
      `rights_holder-${i}-admin_unit_l2`,
      `rights_holder-${i}-admin_unit_l1`,
      `rights_holder-${i}-workplace_homepage`,
    ])
  },
  _getParentFormGroup(el: JQuery<HTMLElement>): JQuery<HTMLElement> {
    const formGroup = el.closest(".form-group")
    if (formGroup.length === 0) {
      throw new Error("Parent form group not found")
    }
    return formGroup
  }
};

ckan.module('digitraffic_theme_rights_holder', RightsHolder)