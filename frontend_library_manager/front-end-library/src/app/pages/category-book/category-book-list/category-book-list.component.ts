import { Component, OnInit } from '@angular/core';
import {ICategoryBookView} from "../../../../models/view/category-book.view";
import {CategoryBookPageApiService} from "../../../../services/api/category-book-page-api.service";
import {IPageResponseModel, IResponseModel} from "../../../../models/commons/response.model";
import {ICategoryBookResponse} from "../../../../models/response/category-book-page.response";
import {ActivatedRoute, Router} from "@angular/router";
import {Constant} from "../../../util/constant";
import {IAuthorResponse} from "../../../../models/response/author.response";
import {IAuthorView} from "../../../../models/view/author.view";
import {ICategoryView} from "../../../../models/view/category.view";
import {GetCategoryApiService} from "../../../../services/api/category-api.service";
import {ICategoryResponse} from "../../../../models/response/category.response";
import {GetAuthorApiService} from "../../../../services/api/author-api.service";
import {environment} from "../../../../environments/environment";
import {finalize} from "rxjs";

@Component({
  selector: 'app-category-book-list',
  templateUrl: './category-book-list.component.html',
  styleUrls: ['./category-book-list.component.css'],
})
export class CategoryBookListComponent implements OnInit {

  categoryBookPage: ICategoryBookView[] = [];
  getAuthor: IAuthorView[] = [];
  getCategory: ICategoryView[] = [];

  type = 0
  categoryIdSearch: number | null = null;
  authorNameIdSearch: number | null = null;
  bookNameSearch!: string;
  page: number = Constant.PAGE_INIT
  size: number = Constant.SIZE_INIT
  totalPage!: number
  listPage!: number[]
  fileUrl = environment.file_url
  loading: boolean = true;
  constructor(private categoryBookApiService: CategoryBookPageApiService,
              private getCategoryApiService: GetCategoryApiService,
              private getAuthorApiService: GetAuthorApiService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.categoryIdSearch = parseInt(<string>params.get('id')) || Constant.NULL_VALUE
        console.log(this.categoryIdSearch)
        this.onSearch();
      }
    )

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.type = parseInt(<string>params.get('tag'))
      }
    )

  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllAuthor()
  }

  onSearch() {
    const searchRequest = {
      authorId: this.authorNameIdSearch,
      bookName: this.bookNameSearch,
      categoryId: this.categoryIdSearch,
      page: this.page,
      size: this.size
    }
    this.loading = true
    this.categoryBookApiService._searchCategoryPage(searchRequest)
      .pipe(finalize(() => {this.loading = false}))
      .subscribe(
      (res: IResponseModel<IPageResponseModel<ICategoryBookResponse>>) => {
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
            image: this.fileUrl + categoryBookPageRes.image,
            note: categoryBookPageRes.note
          };
          this.categoryBookPage.push(categoryBookPageView)
          return categoryBookPageView
        })
      }
    )
  }

  getAllCategory() {
    this.getCategoryApiService._getCategory().subscribe(
      (res: IResponseModel<ICategoryResponse[]>) => {
        this.getCategory = []
          res.data.forEach(categoryRes => {
          const getCategoryView: ICategoryView = {
            idCategory: categoryRes.id_type_book,
            nameCategory: categoryRes.category_name
          };
          this.getCategory.push(getCategoryView)
        })
      }
    )
  }

  getAllAuthor() {
    this.getAuthorApiService._getAuthor().subscribe(
      (res: IResponseModel<IAuthorResponse[]>) => {
        this.getAuthor = []
        res.data.forEach(authorRes => {
          const getAuthorView: IAuthorView = {
            idAuthor: authorRes.id_author,
            nameAuthor: authorRes.name_author
          };
          this.getAuthor.push(getAuthorView)
        })
      }
    )
  }

  selectAuthor() {
    console.log(this.authorNameIdSearch)
  }

  selectCategory() {
    console.log(this.categoryIdSearch)
  }

  onPageChange(item: number) {
    this.page = item
    this.onSearch()
  }

  previousPage() {
    this.page--
    this.onSearch()
  }

  nextPage() {
    this.page++
    this.onSearch()
  }

  onHeader() {
    window.scrollTo(0,450)
  }

  onReset() {
    this.bookNameSearch = Constant.NULL_VALUE
    this.categoryIdSearch = Constant.NULL_VALUE
    this.authorNameIdSearch = Constant.NULL_VALUE
    this.page = Constant.PAGE_INIT
    this.size = Constant.SIZE_INIT
    this.onSearch()
  }
}
