export interface IPublishCompanyRequest {
  address: string,
  agent_people: string,
  date_founding: string,
  email: string,
  id?: number,
  publish_name: string
}

export interface IEditPublishCompanyRequest {
  address: string,
  agent_people: string,
  date_founding: string,
  email: string,
  id: number,
  publish_name: string
}
