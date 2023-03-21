import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPageResponseModel, IResponseModel} from "../../models/commons/response.model";
import { ILoanpayResponse } from "src/app/models/responses/loanpay.response";
import {IEditLoanpayRequest, ILoanpayRequest } from "src/app/models/requests/loanpay.request";
import {IBookManagerResponse} from "../../models/responses/book-manager.response";
import {IAccountResponseModal} from "../../models/responses/account.response";
import {IEditAccountManagerRequest} from "../../models/requests/account-manager.request";


@Injectable({
  providedIn: 'root'
})
export class GetOneAccApiService {
  api = environment.api_url

  constructor(
    private http: HttpClient
  ) {
  }

  _getOneAcc(): Observable<IResponseModel<IAccountResponseModal>> {
    const url = `${this.api}/account/get-one`;
    return this.http.get<IResponseModel<IAccountResponseModal>>(url)
  }

  _editAccount(requestBody: IEditAccountManagerRequest): Observable<IResponseModel<any>>{
    const url = `${this.api}/account`;
    return this.http.put<IResponseModel<any>>(url, requestBody)
  }
}
