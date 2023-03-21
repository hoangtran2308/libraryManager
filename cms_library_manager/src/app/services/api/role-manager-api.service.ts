import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponseModel} from "../../models/commons/response.model";
import {IRoleManagerResponse} from "../../models/responses/role-manager.response";
import {IEditRoleRequest, IRoleManagerRequest} from "../../models/requests/role-manager.request";


@Injectable({
  providedIn: 'root'
})

export class RoleManagerApiService {
  api = environment.api_url;

  constructor(private http: HttpClient) {
  }

  _getAllRoleManager(): Observable<IResponseModel<IRoleManagerResponse[]>> {
    const url = `${this.api}/role/role`;
    return this.http.get<IResponseModel<IRoleManagerResponse[]>>(url)
  }

  _createNewRole(requestBody: IRoleManagerRequest): Observable<IResponseModel<any>> {
    const url = `${this.api}/role`;
    return this.http.post<IResponseModel<any>>(url, requestBody)
  }

  _deleteRole(roleId: number): Observable<IResponseModel<any>> {
    const url = `${this.api}/role?id=${roleId}`;
    return this.http.delete<IResponseModel<any>>(url)
  }

  _editRole(requestBody: IEditRoleRequest): Observable<IResponseModel<any>> {
    const url = `${this.api}/role`;
    return this.http.put<IResponseModel<any>>(url, requestBody)
  }
}
