import { initialize } from "../module-constructs/module";

type ContactDetailMO = {
  _getContactPointTypeEl: () => JQuery<HTMLSelectElement>;
  _getContactPointIndex: () => number;
  _getAllContactPointFields: () => JQuery<HTMLElement>;
  _getContactPointTypeFields: (contactPointType: ContactPointType) => JQuery<HTMLElement>;
  _getContactPointFields: (fieldNames: Set<string>) => JQuery<HTMLElement>;
  _getAllContactPointFieldNames: (i: number) => Set<string>;
  _getParentFormGroup: (el: JQuery<HTMLElement>) => JQuery<HTMLElement>;
  _onlyShowContactPointTypeFields: (contactPointType: ContactPointType) => void;
}

class TemplateError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TemplateError";
    }
}

enum ContactPointType {
    PERSON = "http://www.w3.org/2006/vcard/ns#Individual",
    ORGANIZATION = "http://www.w3.org/2006/vcard/ns#Organization",
}

const ContactDetail: ckan.Module<HTMLDivElement, ContactDetailMO>  = {
  initialize() {
    initialize.apply(this);
    try {
      const contactPointTypeField = this._getContactPointTypeEl()
      const contactPointType = contactPointTypeField.val() as ContactPointType
      this._onlyShowContactPointTypeFields(contactPointType)
      contactPointTypeField.on("change", (event: JQuery.ChangeEvent) => {
        const selectedValue = event.target.value as ContactPointType
        this._onlyShowContactPointTypeFields(selectedValue)
      })
    } catch (e) {
        if (e instanceof TemplateError) {
          return
        }
        throw e
    }
  },
  _onlyShowContactPointTypeFields(contactPointType: ContactPointType): void {
    const contactPointTypeFields = this._getContactPointTypeFields(contactPointType)
    const allContactPointFields = this._getAllContactPointFields()
    const fieldsToHide = allContactPointFields.not(contactPointTypeFields)
    const formGroupsToHide = fieldsToHide.map((_, el) => this._getParentFormGroup($(el))[0])
    const formGroupsToShow = contactPointTypeFields.map((_, el) => this._getParentFormGroup($(el))[0])

    formGroupsToHide.addClass("display-none")
    formGroupsToShow.removeClass("display-none")
  },
  _getContactPointTypeEl(): JQuery<HTMLSelectElement> {
    const contactPointIndex = this._getContactPointIndex()

    const contactPointTypeName = `contact_point-${contactPointIndex}-contact_point_type`
    const contactPointTypeEl = this.el.find<HTMLSelectElement>(`select[name='${contactPointTypeName}']`)
    if (contactPointTypeEl.length === 0) {
      throw new Error(`Contact point type element not found for index ${contactPointIndex}`)
    }
    return contactPointTypeEl
  },
  _getContactPointIndex(): number {
    const contactPointEl = this.el.closest("[data-field='contact_point']")
    if (contactPointEl.length !== 1) {
      throw new Error("Contact point element not found")
    }

    const i = contactPointEl.attr("data-group-index")
    if (i === undefined) {
      throw new Error("Contact point index not found")
    }
    if (i.startsWith("REPEATING-INDEX")) {
        throw new TemplateError("Template")
    }
    return parseInt(i)
  },
  _getContactPointTypeFields(contactPointType: ContactPointType): JQuery<HTMLElement> {
    const i = this._getContactPointIndex()
    const allFieldNames = this._getAllContactPointFieldNames(i)
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
    return this._getContactPointFields(typeFieldNames)
  },
  _getAllContactPointFields(): JQuery<HTMLElement> {
    const i = this._getContactPointIndex()
    const allFieldNames = this._getAllContactPointFieldNames(i)
    return this._getContactPointFields(allFieldNames)
  },
  _getContactPointFields(fieldNames: Set<string>): JQuery<HTMLElement> {
    let fields = $()
    for (const fieldName of fieldNames) {
      const fieldEl = this.el.find(`[name='${fieldName}']`)
      if (fieldEl.length === 0) {
        throw new Error(`Contact point field element not found for field ${fieldName}`)
      }
      fields = fields.add(fieldEl)
    }
    return fields
  },
  _getAllContactPointFieldNames(i: number): Set<string>  {
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
  },
  _getParentFormGroup(el: JQuery<HTMLElement>): JQuery<HTMLElement> {
    const formGroup = el.closest(".form-group")
    if (formGroup.length === 0) {
      throw new Error("Parent form group not found")
    }
    return formGroup
  }
};

ckan.module('digitraffic_theme_contact_detail', ContactDetail)