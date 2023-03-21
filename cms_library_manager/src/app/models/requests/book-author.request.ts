export interface IBookAuthorRequest {
  address: string,
  id?: number,
  name_author: string,
  note: string,
  title: string
}

export interface IEditBookAuthorRequest {
  address: string,
  id: number,
  name_author: string,
  note: string,
  title: string
}
