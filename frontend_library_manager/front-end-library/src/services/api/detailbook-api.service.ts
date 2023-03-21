import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPageResponseModel, IResponseModel} from "../../models/commons/response.model";
import {
  IDetailBookResponseModel, IDetailPopularResponse,
  IDetailResponse
} from "../../models/response/detail-book.response";


@Injectable({
  providedIn: 'root'
})

export class DetailbookApiService {
  api = environment.api_url

  constructor(private http: HttpClient) {
  }

  _getDetailBook(request: any): Observable<IResponseModel<IDetailBookResponseModel>> {
    const url = `${this.api}/home-details/get-one?book_id=${request}`;
    return this.http.get<IResponseModel<IDetailBookResponseModel>>(url)
  }
  _getByPopularDetailBook(request: any): Observable<IResponseModel<IDetailBookResponseModel[]>> {
    const url = `${this.api}/home-details/get-popular?bookId=${request}`;
    return this.http.get<IResponseModel<IDetailBookResponseModel[]>>(url)
  }
}
