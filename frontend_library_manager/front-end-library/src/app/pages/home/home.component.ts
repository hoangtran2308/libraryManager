import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IPageResponseModel, IResponseModel} from "../../../models/commons/response.model";
import {ICategory, IHomeView} from "../../../models/view/home.view";
import {HomeApiService} from "../../../services/api/home-api.service";
import {IHomeResponse} from "../../../models/response/home.response";
import {Constant} from "../../util/constant";
import {ICategoryResponse} from "../../../models/response/category.response";
import {GetCategoryApiService} from "../../../services/api/category-api.service";
import {ICategoryBookView} from "../../../models/view/category-book.view";
import {environment} from "../../../environments/environment";
import {finalize} from "rxjs";
declare function backtop(): any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homePage: IHomeView[] = [];
  type = 0
  listCategory: ICategory[] = []
  categoryIdSelected: number | any = <any>null
  page: number = Constant.PAGE_INIT
  size: number = Constant.SIZE_HOME
  totalPage!: number
  listPage!: number[]
  fileUrl = environment.file_url
  loading: boolean = true
  constructor(private HomeApiService: HomeApiService,
              private getCategoryApiService: GetCategoryApiService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe(
      (params) => {
        console.log(params)
        params.has('')
        backtop();
      }
    )

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        console.log(params)
        this.type = parseInt(<string>params.get('tag'))
      }
    )

  }

  ngOnInit(): void {
    this.onSearchHome();
    this.getAllCategory();
  }


  getAllCategory() {
    this.loading = true
    this.getCategoryApiService._getCategory().pipe(finalize(()=> {this.loading = false})).subscribe(
      (res: IResponseModel<ICategoryResponse[]>) => {
        this.listCategory = []
        res.data.forEach(categoryRes => {
          const getCategoryView: ICategory = {
            categoryId: categoryRes.id_type_book,
            categoryName: categoryRes.category_name
          };
          this.listCategory.push(getCategoryView)
        })
      }
    )
  }
  onSearchHome(categoryId?: number) {
    this.categoryIdSelected = categoryId
    console.log(categoryId)
    const searchRequest = {
      categoryId: this.categoryIdSelected,
      page: this.page,
      size: this.size
    }
    this.loading = true
    this.HomeApiService._searchHomePage(searchRequest).pipe(finalize(() => {this.loading = false})).subscribe(
      (res: IResponseModel<IPageResponseModel<IHomeResponse>>) => {
        this.listPage = []
        this.totalPage = Math.floor(res.data.total_elements / this.size) + 1
        for(let i = 0;i < this.totalPage;i++) {
          this.listPage.push(i)
        }
        this.homePage = res.data.results.map(categoryBookPageRes => {
          const categoryBookPageView: ICategoryBookView = {
            bookId: categoryBookPageRes.book_id,
            bookName: categoryBookPageRes.book_name,
            idAuthor: categoryBookPageRes.id_author,
            authorName: categoryBookPageRes.name_author,
            idTypeBook: categoryBookPageRes.id_type_book,
            categoryName: categoryBookPageRes.category_name,
            companyId: categoryBookPageRes.company_id,
            publishName: categoryBookPageRes.publish_name,
            image:this.fileUrl + categoryBookPageRes.image,
            note: categoryBookPageRes.note
          };
          this.homePage.push(categoryBookPageView)
          return categoryBookPageView
        })
      }
    )
  }

  backtotop() {
    window.scrollTo(0,0)
  }
}
