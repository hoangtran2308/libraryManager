import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponseModel} from "../../models/commons/response.model";
import {IAuthorResponse} from "../../models/response/author.response";

@Injectable({
  providedIn: 'root'
})

export class GetAuthorApiService {
  api = environment.api_url

  constructor(private http: HttpClient) {
  }

  _getAuthor(): Observable<IResponseModel<IAuthorResponse[]>> {
    const url = `${this.api}/home-category/get-author`;
    return this.http.get<IResponseModel<IAuthorResponse[]>>(url)
  }
}
