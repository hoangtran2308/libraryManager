import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPageResponseModel, IResponseModel} from "../../models/commons/response.model";
import {IAccountManagerResponse} from "../../models/responses/account-manager.response";
import {IAccountManagerRequest, IEditAccountManagerRequest} from "../../models/requests/account-manager.request";

@Injectable({
  providedIn: 'root'
})
export class AccountApiService{
  api = environment.api_url

  constructor(private http: HttpClient) {
  }

  _getAllAccountManager(): Observable<IResponseModel<IAccountManagerResponse[]>>{
    const url = `${this.api}/account/account`;
    return this.http.get<IResponseModel<IAccountManagerResponse[]>>(url)
  }

  _searchAccount(request: any): Observable<IResponseModel<IPageResponseModel<IAccountManagerResponse>>> {
    const url = `${this.api}/account/search?page=${request.page}&size=${request.size}
     ${request.sortField? '&sortField=' + request.sortField: ''}
    ${request.sortOrder? '&sortOrder=' + request.sortOrder: ''}
      ${request.username? '&username='+request.username : ''}
      ${request.fullName? '&fullName='+request.fullName : ''}
      ${request.email? '&email='+request.email : ''}
      ${request.roleId? '&roleId='+request.roleId : ''}`;
    return this.http.get<IResponseModel<IPageResponseModel<IAccountManagerResponse>>>(url)
  }

  _createNewAccount(requestBody: IAccountManagerRequest): Observable<IResponseModel<any>> {
    const url = `${this.api}/account`;
    return this.http.post<IResponseModel<any>>(url, requestBody)
  }

  _deleteAccount(accountId: number): Observable<IResponseModel<any>>{
    const url = `${this.api}/account?id=${accountId}`;
    return this.http.delete<IResponseModel<any>>(url)
  }

  _editAccount(requestBody: IEditAccountManagerRequest): Observable<IResponseModel<any>>{
    const url = `${this.api}/account`;
    return this.http.put<IResponseModel<any>>(url, requestBody)
  }
}
