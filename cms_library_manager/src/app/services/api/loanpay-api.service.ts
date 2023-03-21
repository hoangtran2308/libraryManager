import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPageResponseModel, IResponseModel} from "../../models/commons/response.model";
import { ILoanpayResponse } from "src/app/models/responses/loanpay.response";
import {IEditActionRequest, IEditLoanpayRequest, ILoanpayRequest} from "src/app/models/requests/loanpay.request";
import {IBookManagerResponse} from "../../models/responses/book-manager.response";

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

  _searchLoanpay(request: any): Observable<IResponseModel<IPageResponseModel<ILoanpayResponse>>> {
    const url = `${this.api}/call-card/search?page=${request.page}&size=${request.size}
      ${request.username? '&username='+request.username : ''}
      ${request.nameStaff? '&nameStaff='+request.nameStaff : ''}
      ${request.isAction? '&isAction='+request.isAction : ''}
      ${request.status? '&status='+request.status : ''}`
    // ${request.bookName? '&bookName='+request.bookName : ''}
    // ${request.categoryId? '&category_id='+request.categoryId : ''}`;
    return this.http.get<IResponseModel<IPageResponseModel<ILoanpayResponse>>>(url)
  }

  _createNewLoanpay(requestBody: ILoanpayRequest): Observable<IResponseModel<any>> {
    const url = `${this.api}/call-card`
    return this.http.post<IResponseModel<any>>(url, requestBody)
  }
  _deleteLoanpay(call_card_id: number): Observable<IResponseModel<any>> {
    const url = `${this.api}/call-card?id=${call_card_id}`
    return this.http.delete<IResponseModel<any>>(url)
  }

  _editLoanpay(requestBody: IEditLoanpayRequest): Observable<IResponseModel<any>> {
    const url = `${this.api}/call-card`
    return this.http.put<IResponseModel<any>>(url, requestBody)
  }
  _editAction(requestBody: IEditActionRequest): Observable<IResponseModel<any>> {
    const url = `${this.api}/call-card/updateIsAction`
    return this.http.post<IResponseModel<any>>(url, requestBody)
  }

}
