import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponseModel} from "../../models/commons/response.model";
import {environment} from "../../environments/environment";
import {ILoanpayRequest} from "../../models/requests/loanpay.request";
import {ILoanpayResponse} from "../../models/response/loanpay.response";



@Injectable({
  providedIn: 'root'
})
export class LoanpayApiService {
  api = environment.api_url

  constructor(
    private http: HttpClient
  ) {
  }

  _getAllLoanpay(): Observable<IResponseModel<ILoanpayResponse[]>> {
    const url = `${this.api}/call-card`
    return this.http.get<IResponseModel<ILoanpayResponse[]>>(url)
  }


  _createNewLoanpay(requestBody: ILoanpayRequest): Observable<IResponseModel<any>> {
    const url = `${this.api}/home-request`
    return this.http.post<IResponseModel<any>>(url, requestBody)
  }

}
