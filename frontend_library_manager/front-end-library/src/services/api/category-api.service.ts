import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponseModel} from "../../models/commons/response.model";
import {ICategoryResponse} from "../../models/response/category.response";

@Injectable({
  providedIn: 'root'
})

export class GetCategoryApiService {
  api = environment.api_url

  constructor(private http: HttpClient) {
  }

  _getCategory(): Observable<IResponseModel<ICategoryResponse[]>> {
    const url = `${this.api}/home-category/get-category`;
    return this.http.get<IResponseModel<ICategoryResponse[]>>(url)
  }
}
