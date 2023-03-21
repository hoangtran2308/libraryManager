export class Constant {
  public static LIBRARY_STORAGE_KEY =  '3b354a25d9fa723326fd7e1a6d312515'
  public static readonly PAGE_INIT: number = 0
  public static readonly SIZE_INIT: number = 6
  public static readonly SIZE_HOME: number = 8
  public static readonly NULL_VALUE = <any> null
  public static readonly REGEX_PASSWORD_FOR_VALIDATOR =  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$"
  public static readonly REGEX_PHONE_FOR_VALIDATOR = "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$"
}
