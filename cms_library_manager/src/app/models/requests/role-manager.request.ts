export interface IRoleManagerRequest {
  role_id?: number,
  codeRole: string,
  name: string
}

export interface IEditRoleRequest {
  codeRole: string,
  name: string,
  role_id: number
}
