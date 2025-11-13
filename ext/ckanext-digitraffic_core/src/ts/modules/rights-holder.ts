import { RepeatingSubfieldWithTypeFields, type RepeatingSubfieldWithTypeFieldsMO } from "../module-constructs/repeating-subfields";

type RightsHolderMO = RepeatingSubfieldWithTypeFieldsMO<RightsHolderType>

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
  ...RepeatingSubfieldWithTypeFields<RightsHolderType>(),
  fieldName: "rights_holder",
  typeFieldName: "type",
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
        `rights_holder-${i}-member_of`,
      ])
      typeFieldNames = new Set([...allFieldNames].filter(item => !excludedFields.has(item)))
    }
    if (typeFieldNames === undefined) {
        throw new Error(`Rights holder type field names not found for type ${rightsHolderType}`)
    }
    return this._getFields(typeFieldNames)
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
      `rights_holder-${i}-member_of`
    ])
  }
};

ckan.module('digitraffic_core_rights_holder', RightsHolder)