import {Component, OnInit} from '@angular/core';
import {IBookManagerView} from "../../../../models/views/book-manager.view";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IBookCategoryView} from "../../../../models/views/book-category.view";
import {IBookAuthorView} from "../../../../models/views/book-author.view";
import {IPublishCompanyView} from "../../../../models/views/publish-company.view";
import {CategoryApiService} from "../../../../services/api/category-api.service";
import {PublishCompanyApiService} from "../../../../services/api/publish-company-api.service";
import {MessageService} from "primeng/api";
import {IPageResponseModel, IResponseModel} from "../../../../models/commons/response.model";
import {IBookManagerResponse} from "../../../../models/responses/book-manager.response";
import {IBookManagerRequest, IEditBookManagerRequest} from "../../../../models/requests/book-manager.request";
import {IBookCategoryResponse} from "../../../../models/responses/book-category.response";
import {IBookAuthorResponse} from "../../../../models/responses/book-author.response";
import {IPublishCompanyResponse} from "../../../../models/responses/publish-company.response";
import {BookApiService} from "../../../../services/api/book-api.service";
import {AuthorApiService} from "../../../../services/api/author-api.service";
import {Constant} from "../../../../util/constant";
import {environment} from "../../../../../environments/environment";
import {finalize} from "rxjs";

@Component({
  selector: 'app-book-manager-list',
  templateUrl: './book-manager-list.component.html',
  styleUrls: ['./book-manager-list.component.css']
})
export class BookManagerListComponent implements OnInit {

  bookManager : IBookManagerView[] = [];
  bookmanagerInfoForm!: FormGroup;
  bookmanagerSelected!: IBookManagerView;
  listBookCategory: IBookCategoryView[] = [];
  listAuthor: IBookAuthorView[]= [];
  listpublishingCompany:IPublishCompanyView[]=[];
  uploadFile!: File
  requestBookForm: FormData = new FormData()
  bookNameSearch!: string
  page: number = Constant.PAGE_INIT
  size: number = Constant.SIZE_INIT
  pageLink = Constant.PAGE_LINK_SIZE;
  categoryId: number | null = null
  authorId: number | null = null
  publishId: number | null = null;
  listPage!: number[]
  totalPage!: number
  totalElement: number = 0
  fileUrl = environment.file_url
  first: number = 0
  loading: boolean = true
  text!: string;
  results!: any[];
  selectedSortField!: string
  selectedSortOrder!: string
  constructor(private BookApiService: BookApiService,
              private fb: FormBuilder,
              private categoryApiService: CategoryApiService,
              private AuthorApiService : AuthorApiService,
              private publishCompanyApiService: PublishCompanyApiService,
              private messageService: MessageService) {
    this.bookmanagerInfoForm = fb.group({
      book_name: [null],
      id_author: [null],
      publishing_year: [null],
      page_number: [null],
      image: [null],
      price: [null],
      id_type_book: [null],
      company_id: [null],
      amount: [null],
      status:[null],
      note: [null],
    })
  }

  ngOnInit(): void {
    // this.getAllBook()
    this.onSearch()
    this.getAllBookCategory()
    this.getAllBookAuthor()
    this.getAllPublishCompany()
  }

  getAllBook() {
    this.BookApiService._getAllBook().subscribe(
      (res: IResponseModel<IBookManagerResponse[]>) => {
        console.log(res)
        this.bookManager = []
        res.data.forEach(bookManagerRes => {
          const bookManagerView: IBookManagerView = {
            book_id: bookManagerRes.book_id,
            book_name:bookManagerRes.book_name,
            name_author:bookManagerRes.name_author,
            publishing_year:bookManagerRes.publishing_year,
            page_number:bookManagerRes.page_number,
            image:bookManagerRes.image,
            price:bookManagerRes.price,
            category_name:bookManagerRes.category_name,
            publish_name:bookManagerRes.publish_name,
            amount:bookManagerRes.amount,
            status:bookManagerRes.status,
            note: bookManagerRes.note,
            id_author: bookManagerRes.id_author,
            company_id: bookManagerRes.company_id,
            id_type_book: bookManagerRes.id_type_book
          }
          this.bookManager.push(bookManagerView)
        })
      }
    )
  }
  onAddNewBook() {
    // const createNewBookRequest: IBookManagerRequest = {
    //   bookName:this.bookmanagerInfoForm.value.book_name,
    //   idAuthor:this.bookmanagerInfoForm.value.name_author,
    //   publishingYear:this.bookmanagerInfoForm.value.publishing_year,
    //   pageNumber:this.bookmanagerInfoForm.value.page_number,
    //   file:this.bookmanagerInfoForm.value.image,
    //   price:this.bookmanagerInfoForm.value.price,
    //   idTypeBook:this.bookmanagerInfoForm.value.category_name,
    //   companyId:this.bookmanagerInfoForm.value.publish_name,
    //   amount:this.bookmanagerInfoForm.value.amount,
    //   note: this.bookmanagerInfoForm.value.note
    // };
    this.requestBookForm.set('amount',this.bookmanagerInfoForm.value.amount)
    this.requestBookForm.set('bookName',this.bookmanagerInfoForm.value.book_name)
    this.requestBookForm.set('idTypeBook',this.bookmanagerInfoForm.value.id_type_book)
    this.requestBookForm.set('file',this.uploadFile)
    this.requestBookForm.set('idAuthor',this.bookmanagerInfoForm.value.id_author)
    this.requestBookForm.set('pageNumber',this.bookmanagerInfoForm.value.page_number)
    this.requestBookForm.set('price',this.bookmanagerInfoForm.value.price)
    this.requestBookForm.set('companyId',this.bookmanagerInfoForm.value.company_id)
    this.requestBookForm.set('publishingYear',this.bookmanagerInfoForm.value.publishing_year)
    this.requestBookForm.set('note',this.bookmanagerInfoForm.value.note)

        this.BookApiService._createNewBook(this.requestBookForm).subscribe(
          (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo', detail:'Thêm mới danh mục thành công'});
            this.onReset()
          },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo', detail:' Thêm mới danh muc that bai'});
        console.log('Them moi danh muc that bai')
      }
    )
  }


  onDeleteBookManager() {
    if(this.bookmanagerSelected) {
      this.BookApiService._deleteBook(this.bookmanagerSelected.book_id).subscribe(
        (res: IResponseModel<any>) => {
          console.log('Xoa danh muc thanh cong')
          this.messageService.add({severity:'success', summary:'Thông báo', detail:'Xóa danh mục thành công'});
          this.onReset()
        },
        err => {
          this.messageService.add({severity:'error', summary:'Thông báo', detail:'Xoa danh muc that bai'});
          console.log('Xoa danh muc that bai')
        }
      )
    }
  }
  getAllBookCategory() {
    this.categoryApiService._getAllCategory().subscribe(
      (res: IResponseModel<IBookCategoryResponse[]>) => {
        this.listBookCategory = []
        res.data.forEach(bookCategoryRes => {
          const bookCategoryView: IBookCategoryView = {
            id: bookCategoryRes.idTypeBook,
            category_name: bookCategoryRes.categoryName
          }
          this.listBookCategory.push(bookCategoryView)
        })
      }
    )
  }
  getAllBookAuthor() {
    this.AuthorApiService._getAllAuthor().subscribe(
      (res: IResponseModel<IBookAuthorResponse[]>) => {
        console.log(res)
        this.listAuthor = []
        res.data.forEach(bookAuthorRes => {
          const bookAuthorView: IBookAuthorView = {
            id: bookAuthorRes.author_id,
            address: bookAuthorRes.address,
            name_author: bookAuthorRes.author_name,
            note:bookAuthorRes.note,
            title:bookAuthorRes.title,
          }
          this.listAuthor.push(bookAuthorView)
        })
        console.log(this.listAuthor)
      }
    )
  }
  searchBookName(keyword: string): string[] {
      let names: string[] = [];
      for (let i = 0; i < this.bookManager.length; i++){
        if (this.bookManager[i].book_name.includes(keyword)){
          names.push(this.bookManager[i].book_name);
        }
      }
      // this.onSearch()
      return names
  }

  search(event : any) {
    console.log(event.query)
    this.results = this.searchBookName(event.query)
  }

  getAllPublishCompany() {
    this.publishCompanyApiService._getAllPublishCompany().subscribe(
      (res: IResponseModel<IPublishCompanyResponse[]>) => {
        this.listpublishingCompany = [];
        res.data.forEach( publishCompanyRes => {
          const publishCompanyView: IPublishCompanyView = {
            id: publishCompanyRes.company_id,
            name: publishCompanyRes.publish_name,
            address: publishCompanyRes.address,
            email: publishCompanyRes.email,
            agent_people: publishCompanyRes.agent_people,
            date_founding: publishCompanyRes.date_founding
          };
          this.listpublishingCompany.push(publishCompanyView)
        })

      }
    )
  }
  editBook(i: IBookManagerView) {
    this.bookmanagerSelected = i
    console.log(this.bookmanagerSelected)
    this.bookmanagerInfoForm.patchValue(
      {
        book_id: i.book_id,
        book_name:i.book_name,
        publishing_year:i.publishing_year,
        page_number:i.page_number,
        image:i.image,
        price:i.price,
        amount:i.amount,
        note: i.note,
        id_author: i.id_author,
        company_id: i.company_id,
        id_type_book: i.id_type_book
      }
    )
    console.log(this.bookmanagerInfoForm.value)
  }

  onEditBook() {
    const editBookManagerRequest: IEditBookManagerRequest = {
      id:this.bookmanagerSelected.book_id,
      bookName:this.bookmanagerInfoForm.value.book_name,
      idAuthor:this.bookmanagerInfoForm.value.id_author,
      publishingYear:this.bookmanagerInfoForm.value.publishing_year,
      pageNumber:this.bookmanagerInfoForm.value.page_number,
      file:this.bookmanagerInfoForm.value.image,
      price:this.bookmanagerInfoForm.value.price,
      idTypeBook:this.bookmanagerInfoForm.value.id_type_book,
      companyId:this.bookmanagerInfoForm.value.company_id,
      amount:this.bookmanagerInfoForm.value.amount,
      note: this.bookmanagerInfoForm.value.note
    };
    // @ts-ignore
    this.requestBookForm.set('id',this.bookmanagerSelected.book_id)
    this.requestBookForm.set('amount',this.bookmanagerInfoForm.value.amount)
    this.requestBookForm.set('bookName',this.bookmanagerInfoForm.value.book_name)
    this.requestBookForm.set('idTypeBook',this.bookmanagerInfoForm.value.id_type_book)
    this.requestBookForm.set('file',this.uploadFile)
    this.requestBookForm.set('idAuthor',this.bookmanagerInfoForm.value.id_author)
    this.requestBookForm.set('pageNumber',this.bookmanagerInfoForm.value.page_number)
    this.requestBookForm.set('price',this.bookmanagerInfoForm.value.price)
    this.requestBookForm.set('companyId',this.bookmanagerInfoForm.value.company_id)
    this.requestBookForm.set('publishingYear',this.bookmanagerInfoForm.value.publishing_year)
    this.requestBookForm.set('note',this.bookmanagerInfoForm.value.note)
    this.BookApiService._editBook(this.requestBookForm).subscribe(
      (res: IResponseModel<any>) => {
        console.log('Sua danh muc thanh cong')
        this.messageService.add({severity:'success', summary:'Thông báo', detail:' Chỉnh sửa danh muc thành công'});
       this.onSearch()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo', detail:' Chỉnh sửa danh muc that bai'});
        console.log('Sua danh muc that bai')
      }
    )
  }
  selectBook(i: IBookManagerView) {
    console.log(i)
    this.bookmanagerSelected = i
  }

  getFile(event: Event) {
    // @ts-ignore
    this.uploadFile = event.target?.files[0]
    console.log(this.uploadFile)
  }

  onSearch() {
    const searchRequest = {
      bookName: this.bookNameSearch,
      page: this.page,
      size: this.size,
      categoryId: this.categoryId,
      authorId: this.authorId,
      publishId: this.publishId,
      sortField: this.selectedSortField,
      sortOrder: this.selectedSortField ? this.selectedSortOrder : undefined
    }
    this.BookApiService._searchBook(searchRequest)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
      (res: IResponseModel<IPageResponseModel<IBookManagerResponse>>) => {
        this.listPage = []
        this.totalPage = Math.floor(res.data.total_elements / this.size) + 1
        for (let i = 0; i<this.totalPage; i++) {
            this.listPage.push(i)
        }
        console.log(res)
        this.totalElement = res.data.total_elements
        this.bookManager = []
        res.data.results.forEach(bookManagerRes => {
          const bookManagerView: IBookManagerView = {
            book_id: bookManagerRes.book_id,
            book_name:bookManagerRes.book_name,
            name_author:bookManagerRes.name_author,
            publishing_year:bookManagerRes.publishing_year,
            page_number:bookManagerRes.page_number,
            image: this.fileUrl + bookManagerRes.image,
            price:bookManagerRes.price,
            category_name:bookManagerRes.category_name,
            publish_name:bookManagerRes.publish_name,
            amount:bookManagerRes.amount,
            status:bookManagerRes.status,
            note: bookManagerRes.note,
            id_author: bookManagerRes.id_author,
            company_id: bookManagerRes.company_id,
            id_type_book: bookManagerRes.id_type_book
          }
          this.bookManager.push(bookManagerView)
        })
        console.log(this.bookManager)
      }
    )
  }

  selectCategory() {
    console.log(this.categoryId)
  }

  resetValue() {
    this.bookmanagerInfoForm.reset()
    this.bookmanagerInfoForm.patchValue({})
  }

  onReset() {
    this.bookNameSearch = Constant.NULL_VALUE
    this.page = Constant.PAGE_INIT
    this.size = Constant.SIZE_INIT
    this.categoryId = Constant.NULL_VALUE
    this.authorId = Constant.NULL_VALUE
    this.publishId = Constant.NULL_VALUE
    this.selectedSortField = Constant.NULL_VALUE
    this.selectedSortOrder = Constant.NULL_VALUE
    this.first = 0
    this.onSearch()
  }

  onChangePage(event: any) {
    this.page = event.page
    this.size = event.rows
    this.onSearch()
  }

  pageChange($event: any) {
    // @ts-ignore
    this.page = $event.first/$event.rows
    // @ts-ignore
    this.size = $event.rows
    // @ts-ignore
    this.selectedSortField = $event.sortField
    this.selectedSortOrder = $event.sortOrder == 1? 'ACS' : 'DESC'
    console.log($event)
    this.onSearch()
  }
}


