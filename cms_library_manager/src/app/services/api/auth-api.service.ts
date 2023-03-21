    import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {ILoginRequest} from "../../models/requests/login.request";
import {Observable} from "rxjs";
import {IResponseModel} from "../../models/commons/response.model";
import {ILoginResponse} from "../../models/responses/login.response";
import {HttpClient} from "@angular/common/http";
    import {IChangePasswordRequests} from "../../models/requests/change-password.requests";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService{
  api = environment.api_url

  constructor(private http: HttpClient) {
  }

  // DOTENV
  _login(requestBody: ILoginRequest): Observable<IResponseModel<ILoginResponse>> {
    const url = `${this.api}/auth/login`
    return this.http.post<IResponseModel<ILoginResponse>>(url, requestBody)
  }
  _changePassword(request: IChangePasswordRequests): Observable<IResponseModel<any>>{
    const url = `${this.api}/account/change-password`
    return  this.http.put<IResponseModel<any>>(url,request)
  }

  _forgotPassword(email: string): Observable<IResponseModel<any>> {
    const url = `${this.api}/account/forget-password?email=${email}`;
    return this.http.get<IResponseModel<any>>(url)
  }
}
