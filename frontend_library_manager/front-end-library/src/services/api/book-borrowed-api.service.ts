import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPageResponseModel, IResponseModel} from "../../models/commons/response.model";
import {IBookBorrowedResponse} from "../../models/response/book-borrowed.response";

@Injectable({
  providedIn: 'root'
})

export class BookBorrowedApiService {
  api = environment.api_url

  constructor(private http: HttpClient) {
  }

  _getAllBorrowedHistory(): Observable<IResponseModel<IBookBorrowedResponse[]>> {
    const url = `${this.api}/home-history/get-list-book`;
    return this.http.get<IResponseModel<IBookBorrowedResponse[]>>(url)
  }

  _searchBorrowedHistory(request: any): Observable<IResponseModel<IPageResponseModel<IBookBorrowedResponse>>> {
    const url = `${this.api}/home-history/search?page=${request.page}&size=${request.size}`
    return this.http.get<IResponseModel<IPageResponseModel<IBookBorrowedResponse>>>(url)
  }
}
