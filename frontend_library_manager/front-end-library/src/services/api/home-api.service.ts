import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPageResponseModel, IResponseModel} from "../../models/commons/response.model";
import {environment} from "../../environments/environment";
import {IHomeResponse} from "../../models/response/home.response";
import {ICategoryBookResponse} from "../../models/response/category-book-page.response";

@Injectable({
  providedIn: 'root',
})

export class HomeApiService {
  api = environment.api_url;

  constructor(private http: HttpClient) {
  }

  _getAllHomeBook(): Observable<IResponseModel<IHomeResponse[]>> {
    const url = `${this.api}/home-page`;
    return this.http.get<IResponseModel<IHomeResponse[]>>(url)
  }
  _searchHomePage(request: any): Observable<IResponseModel<IPageResponseModel<IHomeResponse>>> {
    const url = `${this.api}/home-page/search?page=${request.page}&size=${request.size}
    ${request.categoryId? '&categoryId='+request.categoryId : ''}`;
    return this.http.get<IResponseModel<IPageResponseModel<IHomeResponse>>>(url)
  }
}
