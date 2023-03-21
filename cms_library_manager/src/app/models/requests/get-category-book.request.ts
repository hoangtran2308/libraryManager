export interface IGetCategoryBookRequest {
  page: number;
  size: number;
  bookName?: string;
  categoryName?: string;
  sort_field?: string;
  sort_order?: string
}
