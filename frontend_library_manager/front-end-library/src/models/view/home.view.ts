export interface IHomeView{
  bookId: number,
  bookName: string,
  idAuthor: number,
  authorName: string,
  idTypeBook: number,
  categoryName: string,
  companyId: number,
  publishName: string,
  image: string,
  note: string
}

export interface ICategory {
  categoryId: number;
  categoryName: string
}
