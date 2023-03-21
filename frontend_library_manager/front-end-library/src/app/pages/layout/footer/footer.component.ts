import { Component, OnInit } from '@angular/core';
import {ICategory} from "../../../../models/view/home.view";
import {IPageResponseModel, IResponseModel} from "../../../../models/commons/response.model";
import {IHomeResponse} from "../../../../models/response/home.response";
import {ICategoryBookView} from "../../../../models/view/category-book.view";
import {Constant} from "../../../util/constant";
import {HomeApiService} from "../../../../services/api/home-api.service";
import {GetCategoryApiService} from "../../../../services/api/category-api.service";
import {ICategoryResponse} from "../../../../models/response/category.response";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  listCategory: ICategory[] = []
  categoryIdSelected: number | any = <any>null
  page: number = Constant.PAGE_INIT
  size: number = Constant.SIZE_INIT
  totalPage!: number
  listPage!: number[]
  categoryBookPage: ICategoryBookView[] = []

  constructor(private homeApiService: HomeApiService,
              private getCategoryApiService: GetCategoryApiService) { }

  ngOnInit(): void {
    this.getAllCategory()
  }

  getAllCategory() {
    this.getCategoryApiService._getCategory().subscribe(
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

  onSearchHeader(categoryId?: number) {
    this.categoryIdSelected = categoryId
    console.log(categoryId)
    const searchRequest = {
      categoryId: this.categoryIdSelected,
      page: this.page,
      size: this.size
    }
    this.homeApiService._searchHomePage(searchRequest).subscribe(
      (res: IResponseModel<IPageResponseModel<IHomeResponse>>) => {
        this.listPage = []
        this.totalPage = Math.floor(res.data.total_elements / this.size) + 1
        for(let i = 0;i < this.totalPage;i++) {
          this.listPage.push(i)
        }
        this.categoryBookPage = res.data.results.map(categoryBookPageRes => {
          const categoryBookPageView: ICategoryBookView = {
            bookId: categoryBookPageRes.book_id,
            bookName: categoryBookPageRes.book_name,
            idAuthor: categoryBookPageRes.id_author,
            authorName: categoryBookPageRes.name_author,
            idTypeBook: categoryBookPageRes.id_type_book,
            categoryName: categoryBookPageRes.category_name,
            companyId: categoryBookPageRes.company_id,
            publishName: categoryBookPageRes.publish_name,
            image: categoryBookPageRes.image,
            note: categoryBookPageRes.note
          };
          this.categoryBookPage.push(categoryBookPageView)
          return categoryBookPageView
        })
      }
    )
  }

  onHeader() {
    window.scrollTo(0, 350)
  }
}
