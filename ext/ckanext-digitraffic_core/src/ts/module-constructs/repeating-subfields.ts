import {initialize} from "./module";
import "@fintraffic/fds-coreui-components/dist/define/fds-button"

export type RepeatingSubfieldCoreMO = {
  fieldName: string;
  _getIndex: () => number;
  _getAllFields: () => JQuery<HTMLElement>;
  _getFields: (fieldNames: Set<string>) => JQuery<HTMLElement>;
  _getAllFieldNames: (i: number) => Set<string>;
  _getParentFormGroup: (el: JQuery<HTMLElement>) => JQuery<HTMLElement>;
}

export type TypeFieldsMO<T> = {
  typeFieldName: string;
  _getTypeEl: () => JQuery<HTMLSelectElement>;
  _getTypeFields: (fieldType: T) => JQuery<HTMLElement>;
  _onlyShowTypeFields: (fieldType: T) => void;
}

export type RepeatingSubfieldWithTypeFieldsMO<T> = RepeatingSubfieldCoreMO & TypeFieldsMO<T>;

export function isTypeFieldsMO<T>(obj: RepeatingSubfieldCoreMO): obj is RepeatingSubfieldWithTypeFieldsMO<T> {
  //@ts-ignore
  return typeof obj?._getTypeEl === 'function' &&
    //@ts-ignore
    typeof obj?._getTypeFields === 'function' &&
    //@ts-ignore
    typeof obj?._onlyShowTypeFields === 'function';
}

class TemplateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TemplateError";
  }
}

export const RepeatingSubfield = (): ckan.Module<HTMLDivElement, RepeatingSubfieldCoreMO> => ({
  fieldName: "NOT_SET",
  initialize() {
    initialize.apply(this);
  },
  _getIndex(): number {
    const element = this.el.closest(`[data-field='${this.fieldName}']`)
    if (element.length !== 1) {
      throw new Error("Element not found")
    }

    const i = element.attr("data-group-index")
    if (i === undefined) {
      throw new Error("Index not found")
    }
    if (i.startsWith("REPEATING-INDEX")) {
      throw new TemplateError("Template")
    }
    return parseInt(i)
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
        throw new Error(`Field element not found for field ${fieldName}`)
      }
      fields = fields.add(fieldEl)
    }
    return fields
  },
  _getParentFormGroup(el: JQuery<HTMLElement>): JQuery<HTMLElement> {
    const formGroup = el.closest(".form-group")
    if (formGroup.length === 0) {
      throw new Error("Parent form group not found")
    }
    return formGroup
  },
  _getAllFieldNames(_: number): Set<string> {
    throw Error('No All Field Names')
  }
});

export const RepeatingSubfieldWithTypeFields = <T>(): ckan.Module<HTMLDivElement, RepeatingSubfieldWithTypeFieldsMO<T>> => {
  const repeatingSubfield = RepeatingSubfield()
  return {
    ...repeatingSubfield,
    initialize() {
      repeatingSubfield.initialize.call(this);
      try {
        const el = this._getTypeEl()
        const fieldType = el.val() as T
        this._onlyShowTypeFields(fieldType)
        el.on("change", (event: JQuery.ChangeEvent) => {
          const selectedValue = event.target.value as T
          this._onlyShowTypeFields(selectedValue)
        })
      } catch (e) {
        if (e instanceof TemplateError) {
          return
        }
        throw e
      }
    },
    typeFieldName: "NOT_SET",
    _getTypeEl(): JQuery<HTMLSelectElement> {
      const i = this._getIndex()

      const fieldTypeName = `${this.fieldName}-${i}-${this.typeFieldName}`
      const fieldTypeEl = this.el.find<HTMLSelectElement>(`select[name='${fieldTypeName}']`)
      if (fieldTypeEl.length === 0) {
        throw new Error(`Element not found for index ${i}`)
      }
      return fieldTypeEl
    },
    _onlyShowTypeFields(fieldType: T): void {
      const els = this._getTypeFields(fieldType)
      const allFields = this._getAllFields()
      const fieldsToHide = allFields.not(els)
      const formGroupsToHide = fieldsToHide.map((_, el) => this._getParentFormGroup($(el))[0])
      const formGroupsToShow = els.map((_, el) => this._getParentFormGroup($(el))[0])

      formGroupsToHide.addClass("display-none")
      formGroupsToShow.removeClass("display-none")
    },
    _getTypeFields(_: T): JQuery<HTMLElement> {
      throw Error('No Type Fieds')
    },
  }
}
