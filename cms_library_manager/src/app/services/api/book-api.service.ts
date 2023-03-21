import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPageResponseModel, IResponseModel} from "../../models/commons/response.model";
import {IBookManagerResponse} from "../../models/responses/book-manager.response";
import {generateParams} from "../../util/public-function";
import {Constant} from "../../util/constant";


@Injectable({
  providedIn: 'root'
})
export class BookApiService{
  api = environment.api_url

  constructor(
    private http: HttpClient
  ) {}

  _getAllBook(): Observable<IResponseModel<IBookManagerResponse[]>> {
    const url = `${this.api}/book/book`;
    return this.http.get<IResponseModel<IBookManagerResponse[]>>(url)
  }

  _searchBook(request: any): Observable<IResponseModel<IPageResponseModel<IBookManagerResponse>>> {
    const url = `${this.api}/book/search?page=${request.page}&size=${request.size}
     ${request.sortField? '&sortField=' + request.sortField: ''}
    ${request.sortOrder? '&sortOrder=' + request.sortOrder: ''}
    ${request.bookName? '&bookName='+request.bookName : ''}
    ${request.categoryId? '&categoryId='+request.categoryId : ''}
     ${request.authorId? '&authorId='+request.authorId : ''}
    ${request.publishId? '&publishId='+request.publishId : ''}`
    return this.http.get<IResponseModel<IPageResponseModel<IBookManagerResponse>>>(url)
  }

  _createNewBook(requestBody: FormData): Observable<IResponseModel<any>> {
    const url = `${this.api}/book`
    return this.http.post<IResponseModel<any>>(url, requestBody)
  }

  _deleteBook(bookId: number): Observable<IResponseModel<any>> {
    const url = `${this.api}/book?id=${bookId}`;
    return this.http.delete<IResponseModel<any>>(url)
  }

  _editBook(requestBody: FormData): Observable<IResponseModel<any>> {
    const url = `${this.api}/book`;
    return this.http.put<IResponseModel<any>>(url, requestBody)
  }

}
