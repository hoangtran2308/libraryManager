import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPageResponseModel, IResponseModel} from "../../models/commons/response.model";
import {environment} from "../../environments/environment";
import {IRegisterRequest} from "../../models/requests/register.request";
import {IRegisterResponse} from "../../models/response/register.response";


@Injectable({
  providedIn: 'root'
})
export class RegisterApiService {
  api = environment.api_url

  constructor(private http: HttpClient) {
  }
  _getAllAccountManager(): Observable<IResponseModel<IRegisterResponse[]>>{
    const url = `${this.api}/account/account`;
    return this.http.get<IResponseModel<IRegisterResponse[]>>(url)
  }

  _createNewAccount(requestBody: IRegisterRequest): Observable<IResponseModel<any>> {
    const url = `${this.api}/account/register`;
    return this.http.post<IResponseModel<any>>(url, requestBody)
  }
}
