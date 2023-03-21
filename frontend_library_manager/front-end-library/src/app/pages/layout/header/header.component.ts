import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ICategoryView} from "../../../../models/view/category.view";
import {ICategory} from "../../../../models/view/home.view";
import {IPageResponseModel, IResponseModel} from "../../../../models/commons/response.model";
import {ICategoryResponse} from "../../../../models/response/category.response";
import {GetCategoryApiService} from "../../../../services/api/category-api.service";
import {HomeApiService} from "../../../../services/api/home-api.service";
import {Constant} from "../../../util/constant";
import {IHomeResponse} from "../../../../models/response/home.response";
import {ICategoryBookView} from "../../../../models/view/category-book.view";
import {GetAccountApiService} from "../../../../services/api/account-api.service";
import {IAccountViewModal} from "../../../../models/view/account.view";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../../services/account.service";
import {TokenService} from "../../../../services/token.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  accountData!: IAccountViewModal
  categoryBookPage: ICategoryBookView[] = []
  listCategory: ICategory[] = []
  categoryIdSelected: number | any = <any>null
  page: number = Constant.PAGE_INIT
  size: number = Constant.SIZE_INIT
  totalPage!: number
  listPage!: number[]
  currentAccount!: IAccountViewModal

  constructor(private getCategoryApiService: GetCategoryApiService,
              private homeApiService: HomeApiService,
              private accountService: AccountService,
              private tokenService: TokenService,
              ) {
    this.getIdAccount()
  }

  ngOnInit(): void {
    this.getAllCategory()
    this.getCurrentAccount()
  }
  ngAfterViewInit():void {

    this.loadSpecificScriptOnSpecificPage(['../../../assets/js/main.js', '../../../assets/js/mmenu.min.js', '../../../assets/js/bxslider.min.js', '../../../assets/js/facts.counter.min.js', '../../../assets/js/harvey.min.js', '../../../assets/js/masonry.min.js', '../../../assets/js/mixitup.min.js', '../../../assets/js/responsive.table.min.js'], 'app-pages')
  }

  async loadSpecificScriptOnSpecificPage(listScriptUrl: string[], currentPageSelector: string) {
    await listScriptUrl.forEach((url) => {
      const node = document.createElement('script');
      node.src = url;
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName(currentPageSelector)[0].appendChild(node);
    })
  }
  getCurrentAccount() {
    this.accountService.getCurrentAccount().subscribe(
      res => {
        if(res) {
          this.currentAccount = res
          console.log(this.currentAccount)
        }
      }
    )
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

  getIdAccount() {

  }

  logout() {
    this.tokenService.clearKey()
    window.location.replace('/pages/home')
  }

  onClickMenu() {

  }
}
