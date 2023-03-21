import {Injectable} from "@angular/core";

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IPageResponseModel, IResponseModel} from "../../models/commons/response.model";
import {environment} from "../../environments/environment";
import {ICategoryBookResponse} from "../../models/response/category-book-page.response";

@Injectable({
  providedIn: 'root',
})

export class CategoryBookPageApiService {
  api = environment.api_url;

  constructor(private http: HttpClient) {
  }

  _getAllCategoryBook(): Observable<IResponseModel<ICategoryBookResponse[]>> {
    const url = `${this.api}/home-category`;
    return this.http.get<IResponseModel<ICategoryBookResponse[]>>(url)
  }

  _searchCategoryPage(request: any): Observable<IResponseModel<IPageResponseModel<ICategoryBookResponse>>> {
    const url = `${this.api}/home-category/search?page=${request.page}&size=${request.size}
    ${request.bookName? '&bookName='+request.bookName : ''}
    ${request.authorId? '&authorId='+request.authorId : ''}
    ${request.categoryId? '&categoryId='+request.categoryId : ''}`;
    return this.http.get<IResponseModel<IPageResponseModel<ICategoryBookResponse>>>(url)
  }

}
