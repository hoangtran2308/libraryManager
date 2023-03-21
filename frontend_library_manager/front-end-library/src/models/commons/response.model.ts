export interface IResponseModel<T> {
  code: number,
  data: T
  message: string
}

export interface IPageResponseModel<T> {
  results: T[],
  page: number,
  total_elements: number,
  total_pages: number,
  page_size: number
}
