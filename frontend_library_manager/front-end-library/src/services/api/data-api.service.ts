import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponseModel} from "../../models/commons/response.model";
import {IDataResponse} from "../../models/response/data.response";



@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  api = environment.api_url

  constructor(
    private http: HttpClient
  ) {}

  _getAllData(): Observable<IResponseModel<IDataResponse[]>> {
    const url = `assets/data/data.json`
    return this.http.get<IResponseModel<IDataResponse[]>>(url)
  }
}
