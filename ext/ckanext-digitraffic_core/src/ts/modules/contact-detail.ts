import { RepeatingSubfieldWithTypeFields, type RepeatingSubfieldWithTypeFieldsMO } from "../module-constructs/repeating-subfields";

type ContactDetailMO = RepeatingSubfieldWithTypeFieldsMO<ContactPointType>

enum ContactPointType {
    PERSON = "http://www.w3.org/2006/vcard/ns#Individual",
    ORGANIZATION = "http://www.w3.org/2006/vcard/ns#Organization",
}

const ContactDetail: ckan.Module<HTMLDivElement, ContactDetailMO>  = {
  ...RepeatingSubfieldWithTypeFields<ContactPointType>(),
  fieldName: "contact_point",
  typeFieldName: "contact_point_type",
  _getTypeFields(contactPointType: ContactPointType): JQuery<HTMLElement> {
    const i = this._getIndex()
    const allFieldNames = this._getAllFieldNames(i)
    let typeFieldNames: Set<string> | undefined = undefined
    if (contactPointType === ContactPointType.PERSON) {
      typeFieldNames = allFieldNames
    }
    if (contactPointType === ContactPointType.ORGANIZATION) {
      const excludedFields = new Set([
        `contact_point-${i}-organization_name`
      ])
      typeFieldNames = new Set([...allFieldNames].filter(item => !excludedFields.has(item)))
    }
    if (typeFieldNames === undefined) {
        throw new Error(`Contact point type field names not found for type ${contactPointType}`)
    }
    return this._getFields(typeFieldNames)
  },
  _getAllFieldNames(i: number): Set<string>  {
    return new Set([
      `contact_point-${i}-contact_point_type`,
      `contact_point-${i}-fn`,
      `contact_point-${i}-organization_name`,
      `contact_point-${i}-has_email`,
      `contact_point-${i}-has_telephone`,
      `contact_point-${i}-has_url`,
      `contact_point-${i}-street_address`,
      `contact_point-${i}-locality`,
      `contact_point-${i}-postal_code`,
      `contact_point-${i}-region`,
      `contact_point-${i}-country_name`,
    ])
  }
};

ckan.module('digitraffic_core_contact_detail', ContactDetail)