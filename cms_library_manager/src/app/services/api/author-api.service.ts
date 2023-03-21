import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPageResponseModel, IResponseModel} from "../../models/commons/response.model";
import {IBookAuthorResponse} from "../../models/responses/book-author.response";
import {IBookAuthorRequest, IEditBookAuthorRequest} from "../../models/requests/book-author.request";
import {IBookManagerResponse} from "../../models/responses/book-manager.response";



@Injectable({
  providedIn: 'root'
})
export class AuthorApiService{
  api = environment.api_url

  constructor(
    private http: HttpClient
  ) {}

  _getAllAuthor(): Observable<IResponseModel<IBookAuthorResponse[]>> {
    const url = `${this.api}/author/author`
    return this.http.get<IResponseModel<IBookAuthorResponse[]>>(url)
  }
  _searchAuthor(request: any): Observable<IResponseModel<IPageResponseModel<IBookAuthorResponse>>> {
    const url = `${this.api}/author/search?page=${request.page}&size=${request.size}
    ${request.sortField? '&sortField=' + request.sortField: ''}
    ${request.sortOrder? '&sortOrder=' + request.sortOrder: ''}
    ${request.authorName? '&authorName='+request.authorName : ''}
    ${request.address? '&address='+request.address : ''}
     ${request.title? '&title='+request.title : ''}`
    return this.http.get<IResponseModel<IPageResponseModel<IBookAuthorResponse>>>(url)
  }
  _createNewAuthor(requestBody: IBookAuthorRequest): Observable<IResponseModel<any>> {
    const url = `${this.api}/author`
    return this.http.post<IResponseModel<any>>(url, requestBody)
  }

  _deleteBookAuthor(authorId: number): Observable<IResponseModel<any>> {
    const url = `${this.api}/author?id=${authorId}`
    return this.http.delete<IResponseModel<any>>(url)
  }

  _editBookAuthor(requestBody: IEditBookAuthorRequest): Observable<IResponseModel<any>> {
    const url = `${this.api}/author`
    return this.http.put<IResponseModel<any>>(url, requestBody)
  }

}
