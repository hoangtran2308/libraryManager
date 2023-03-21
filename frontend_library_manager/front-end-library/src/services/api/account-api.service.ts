import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponseModel} from "../../models/commons/response.model";
import {IAccountResponseModal} from "../../models/response/account.response";
import {IEditAccountRequest} from "../../models/requests/account.request";

@Injectable({
  providedIn: 'root'
})

export class GetAccountApiService {
  api= environment.api_url

  constructor(private http: HttpClient) {
  }

  _getIdAccount(): Observable<IResponseModel<IAccountResponseModal>> {
    const url = `${this.api}/account/get-one`;
    return this.http.get<IResponseModel<IAccountResponseModal>>(url)
  }

  _editAccount(requestBody: IEditAccountRequest): Observable<IResponseModel<any>>{
    const url = `${this.api}/account`;
    return this.http.put<IResponseModel<any>>(url, requestBody)
  }
}
