import { Component, OnInit } from '@angular/core';
import {CategoryApiService} from "../../../../services/api/category-api.service";
import {IPageResponseModel, IResponseModel} from "../../../../models/commons/response.model";
import {IBookCategoryResponse} from "../../../../models/responses/book-category.response";
import {IBookCategoryView} from "../../../../models/views/book-category.view";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IBookCategoryRequest, IEditBookCategoryRequest} from "../../../../models/requests/book-category.request";
import {MessageService} from "primeng/api";
import {Constant} from "../../../../util/constant";
import {finalize} from "rxjs";

@Component({
  selector: 'app-category-manager-list',
  templateUrl: './category-manager-list.component.html',
  styleUrls: ['./category-manager-list.component.css']
})
export class CategoryManagerListComponent implements OnInit {
  categoryManager : IBookCategoryView[] = [];
  bookInfoForm!: FormGroup;
  bookCategorySelected!: IBookCategoryView;
  categoryNameSearch!: string
  page: number = Constant.PAGE_INIT
  size: number = Constant.SIZE_INIT
  totalElement: number = 0
  first: number = 0
  loading: boolean = true;
  selectedSortField!: string;
  selectedSortOrder!: string

  constructor(private categoryApiService: CategoryApiService,
              private messageService: MessageService,
              private fb: FormBuilder) {
    this.bookInfoForm = fb.group({
      category_name: [null]
    })
  }

  ngOnInit(): void {
  // this.getAllBookCategory();
  this.onSearchBookCategory()
  }

    getAllBookCategory() {
      this.categoryApiService._getAllCategory().subscribe(
        (res: IResponseModel<IBookCategoryResponse[]>) => {
          this.categoryManager = [];
          res.data.forEach(bookCategoryRes => {
            const bookCategoryView: IBookCategoryView = {
              id: bookCategoryRes.idTypeBook,
              category_name: bookCategoryRes.categoryName
            };
            this.categoryManager.push(bookCategoryView)
          })
        }
      )
    }
  onSearchBookCategory() {
    const searchRequest = {
      categoryName: this.categoryNameSearch,
      page: this.page,
      size: this.size,
      sortField: this.selectedSortField,
      sortOrder: this.selectedSortField ? this.selectedSortOrder : undefined
    }
    console.log(searchRequest)
    this.categoryApiService._searchBookCategory(searchRequest)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
      (res: IResponseModel<IPageResponseModel<IBookCategoryResponse>>) => {
        this.totalElement = res.data.total_elements
        this.categoryManager = [];
        res.data.results.forEach(bookCategoryRes => {
          const bookCategoryView: IBookCategoryView = {
            id: bookCategoryRes.idTypeBook,
            category_name: bookCategoryRes.categoryName
          };
          this.categoryManager.push(bookCategoryView)
        })
      }
    )
  }

  onAddNewBookCategory() {
    const createNewBookRequest: IBookCategoryRequest = {
      category_name: this.bookInfoForm.value.category_name,
    };
    this.categoryApiService._createNewCategory(createNewBookRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo', detail:'Thêm mới danh mục thành công'});
        console.log('Them moi danh muc thanh cong');
       this.onReset()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo', detail:'Thêm mới danh mục thất bại'});
        console.log('Them moi danh muc that bai')
      }
    )
  }

  onDeleteBookCategory() {
    if(this.bookCategorySelected) {
      this.categoryApiService._deleteBookCategory(this.bookCategorySelected.id).subscribe(
        (res: IResponseModel<any>) => {
          this.messageService.add({severity:'success', summary:'Thông báo', detail:'Xóa danh mục thành công'});
          console.log('Xoa danh muc thanh cong');
         this.onSearchBookCategory()
        },
        err => {
          this.messageService.add({severity:'error', summary:'Thông báo', detail:'Xóa danh mục thất bại'});
          console.log('Xoa danh muc that bai')
        }
      )
    }
  }

  editBookCategory(i: IBookCategoryView) {
    this.bookCategorySelected = i;
    this.bookInfoForm.patchValue(
      {
        category_name: i.category_name,
      }
    )
  }

  onEditBookCategory() {
    const editBookCategoryRequest: IEditBookCategoryRequest = {
      category_name: this.bookInfoForm.value.category_name,
      id: this.bookCategorySelected.id
    };
    this.categoryApiService._editBookCategory(editBookCategoryRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo', detail:'Chỉnh sửa danh mục thành công'});
        console.log('Sua danh muc thanh cong');
        this.onSearchBookCategory()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo', detail:'Chỉnh sửa danh mục thất bại'});
        console.log('Sua danh muc that bai')
      }
    )
  }

  selectBookCategory(i: IBookCategoryView) {
    this.bookCategorySelected = i
  }
  onReset() {
    this.categoryNameSearch = Constant.NULL_VALUE
    this.page = Constant.PAGE_INIT
    this.size = Constant.SIZE_INIT
    this.first = 0
    this.selectedSortField = Constant.NULL_VALUE
    this.selectedSortOrder = Constant.NULL_VALUE
    this.onSearchBookCategory()
  }

  pageChange($event: any) {
    // @ts-ignore
    this.page = $event.first/$event.rows
    // @ts-ignore
    this.size = $event.rows
    this.selectedSortOrder = $event.sortOrder == 1? 'ACS' : 'DESC'
    // @ts-ignore
    this.selectedSortField = $event.sortField
    console.log($event)
    this.onSearchBookCategory()
  }
}

