export interface IEditAccountRequest {
  dob: string,
  email: string,
  full_name: string,
  id: number,
  password?: string,
  phone: string,
  role_id: number,
  username: string
}
