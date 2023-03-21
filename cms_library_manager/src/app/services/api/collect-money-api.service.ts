import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPageResponseModel, IResponseModel} from "../../models/commons/response.model";
import {ICollectMoneyResponses} from "../../models/responses/collect-money.response";
import {ICollectMoneyRequests, IEditCollectMoneyRequests} from "../../models/requests/collect-money.requests";
import {ILoanpayResponse} from "../../models/responses/loanpay.response";


@Injectable({
  providedIn: 'root'
})
export class CollectMoneyApiService{
  api = environment.api_url;

  constructor(
    private http: HttpClient
  ) {}

  _getAllCollectMoney(): Observable<IResponseModel<ICollectMoneyResponses[]>> {
    const url = `${this.api}/collect-money/collect-money`;
    return this.http.get<IResponseModel<ICollectMoneyResponses[]>>(url)
  }

  _searchColect(request: any): Observable<IResponseModel<IPageResponseModel<ICollectMoneyResponses>>> {
    const url = `${this.api}/collect-money/search?page=${request.page}&size=${request.size}
    ${request.sortOrder? '&sortOrder='+request.sortOrder : ''}
    ${request.sortField? '&sortField='+request.sortField : ''}
    ${request.fullName? '&fullName='+request.fullName : ''}
    ${request.username? '&username='+request.username : ''}
    ${request.staffId? '&staffId='+request.staffId : ''}`
    // ${request.bookName? '&bookName='+request.bookName : ''}
    // ${request.categoryId? '&category_id='+request.categoryId : ''}`;
    return this.http.get<IResponseModel<IPageResponseModel<ICollectMoneyResponses>>>(url)
  }

  _createNewCollectMoney(requestBody: ICollectMoneyRequests): Observable<IResponseModel<any>> {
    const url = `${this.api}/collect-money`;
    return this.http.post<IResponseModel<any>>(url, requestBody)
  }

  _deleteCollectMoney(collectMoneyId: number): Observable<IResponseModel<any>> {
    const url = `${this.api}/collect-money?id=${collectMoneyId}`;
    return this.http.delete<IResponseModel<any>>(url)
  }

  _editCollectMoney(requestBody: IEditCollectMoneyRequests): Observable<IResponseModel<any>> {
    const url = `${this.api}/collect-money`;
    return this.http.put<IResponseModel<any>>(url, requestBody)
  }
}
