export interface IAccountManagerRequest {
  role_id: string,
  dob: string,
  email: string,
  full_name: string,
  id?: number,
  password: string,
  phone: string,
  username: string
}

export interface IEditAccountManagerRequest {
  role_id: string,
  dob: string,
  email: string,
  full_name: string,
  id: number,
  password: string,
  phone: string,
  username: string
}
