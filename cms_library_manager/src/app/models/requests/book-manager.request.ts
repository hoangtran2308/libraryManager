export interface IBookManagerRequest {
  amount: string,
  bookName: string,
  companyId: string,
  file: string,
  id?: number,
  idAuthor: string,
  idTypeBook: string,
  pageNumber: string,
  price: string,
  publishingYear: string,
  status?: string,
  note: string
}
export interface IEditBookManagerRequest {
  amount: string,
  bookName: string,
  companyId: string,
  file: string,
  id: number,
  idAuthor: string,
  idTypeBook: string,
  pageNumber: string,
  price: string,
  publishingYear: string,
  status?: string,
  note: string
}

