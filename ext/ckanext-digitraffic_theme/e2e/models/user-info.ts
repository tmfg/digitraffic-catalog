export type UserInfoOptionalFields = {
  description?: string,
  firstName?: string,
  lastName?: string,
  phoneNumber?: string
}

export class UserInfo {
  name: string
  fullName: string
  email: string
  description?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  constructor(name: string, fullName: string, email: string, optionalValues?: UserInfoOptionalFields) {
    this.name = name
    this.fullName = fullName
    this.email = email
    this.description = optionalValues?.description
    this.firstName = optionalValues?.firstName
    this.lastName = optionalValues?.lastName
    this.phoneNumber = optionalValues?.phoneNumber
  }
  cloneWith(parameters: Partial<UserInfo>): UserInfo {
    return new UserInfo(
      parameters.name || this.name,
      parameters.fullName || this.fullName,
      parameters.email ||this.email, {
      ...this,
      ...parameters
    })
  }
}