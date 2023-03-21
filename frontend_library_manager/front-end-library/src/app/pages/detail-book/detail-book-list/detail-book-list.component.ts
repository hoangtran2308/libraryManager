import {Component, OnInit} from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {IDetailBookPopularResponseModel} from "../../../../models/response/detail-book.response";
import {ILoanpayView} from "../../../../models/view/loanpay.view";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoanpayApiService} from "../../../../services/api/loanpay-api.service";
import {MessageService} from "primeng/api";
import {ILoanpayResponse} from "../../../../models/response/loanpay.response";
import {IPageResponseModel, IResponseModel} from "../../../../models/commons/response.model";
import {ILoanpayRequest} from "../../../../models/requests/loanpay.request";
import {ActivatedRoute} from "@angular/router";
import {DetailbookApiService} from "../../../../services/api/detailbook-api.service";
import {IDetailBookPopularViewModel,IDetailBookViewModel} from "../../../../models/view/detail-book.views";
import {AccountService} from "../../../../services/account.service";
import {IAccountViewModal} from "../../../../models/view/account.view";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-detail-book-list',
  templateUrl: './detail-book-list.component.html',
  styleUrls: ['./detail-book-list.component.css']
})
export class DetailBookListComponent implements OnInit {
  bookData!: IDetailBookViewModel
  bookPopularData: IDetailBookPopularViewModel[] = []
  loanPayManager: ILoanpayView[] = []
  loanpayInfoForm!: FormGroup
  bookId!: number
  currentAccount!: IAccountViewModal
  responsiveOptions: any;
  fileUrl = environment.file_url

  constructor(
    private loanpayApiService: LoanpayApiService,
    private DetailbookApiService: DetailbookApiService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        this.bookId = parseInt(<string>params.get('id'))
        if (this.bookId) {
          this.getBookDetail(this.bookId)
          this.getByPopularDetailBook(this.bookId)
          this.getCurrentAccount()
        }
      }
    )
    this.loanpayInfoForm = fb.group({
      amount: [null],
      note: [null],
      // status: [null],
      // call_card_details_id: [null],
      book_id: [null],
      // card_number: [null],
      // staff_id: [null],
      // start_date: [null],
      end_date: [null]
      // call_card_id: [null],
      // account_id: [null]
    })
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }


  ngOnInit(): void {
    this.getAllLoanpay();
    this.DetailbookApiService._getByPopularDetailBook(this.bookId).subscribe(
      (res: IResponseModel<IDetailBookPopularResponseModel[]>) => {
        this.bookPopularData = []
        res.data.forEach(bookpoularRes => {
          const detailbookView: IDetailBookPopularViewModel = {
            amount: bookpoularRes.amount,
            bookId: bookpoularRes.book_id,
            bookName: bookpoularRes.book_name,
            categoryName: bookpoularRes.category_name,
            companyId: bookpoularRes.company_id,
            idAuthor: bookpoularRes.id_author,
            idTypeBook: bookpoularRes.id_type_book,
            image: bookpoularRes.image,
            nameAuthor: bookpoularRes.name_author,
            note: bookpoularRes.note,
            pageNumber: bookpoularRes.page_number,
            price: bookpoularRes.price,
            publishName: bookpoularRes.publish_name,
            publishingYear: bookpoularRes.publishing_year,
            status: bookpoularRes.status,
          }
          this.bookPopularData.push(detailbookView)
        })
      }
    )
  }

  getCurrentAccount() {
    this.accountService.getCurrentAccount().subscribe(
      res => {
        console.log(res)
        if(res) {
          this.currentAccount = res
          console.log(this.currentAccount)
        }
      }
    )
  }

  getAllLoanpay() {
    this.loanpayApiService._getAllLoanpay().subscribe(
      (res: IResponseModel<ILoanpayResponse[]>) => {
        this.loanPayManager = []
        res.data.forEach(loanpayRes => {
          const loanpayView: ILoanpayView = {
            call_card_id: loanpayRes.call_card_id,
            username: loanpayRes.username,
            staff_id: loanpayRes.staff_id,
            name_staff: loanpayRes.name_staff,
            status: loanpayRes.status,
            amount: loanpayRes.amount,
            book_name: loanpayRes.book_name,
            note: loanpayRes.note,
            start_date: loanpayRes.start_date,
            end_date: loanpayRes.end_date,
            account_id: loanpayRes.account_id
          }
          this.loanPayManager.push(loanpayView)
        })
      }
    )
  }

  // add
  onAddNewLoanpay() {
    const createNewLoanpayRequest: ILoanpayRequest = {
      amount: this.loanpayInfoForm.value.amount,
      book_id: this.loanpayInfoForm.value.book_id,
      note: this.loanpayInfoForm.value.note,
      end_date: this.loanpayInfoForm.value.end_date
    }

    this.loanpayApiService._createNewLoanpay(createNewLoanpayRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity: 'success', summary: 'Thông báo', detail: 'Đăng kí mượn thành công'});
        console.log('Đăng kí mượn thành công')
        this.getAllLoanpay()
      },
      err => {
        console.log(err);
        this.messageService.add({severity: 'error', summary: 'Thông báo', detail: 'Đăng kí mượn thất bại'});
        console.log('Đăng kí mượn thất bại')
      }
    )
  }

  // getAll detail

  getBookDetail(bookId: number) {
    // console.log(bookId)
    this.DetailbookApiService._getDetailBook(bookId).subscribe(data => {
      this.bookData = {
        amount: data.data.amount,
        bookId: data.data.book_id,
        bookName: data.data.book_name,
        categoryName: data.data.category_name,
        companyId: data.data.company_id,
        idAuthor: data.data.id_author,
        idTypeBook: data.data.id_type_book,
        image: data.data.image,
        nameAuthor: data.data.name_author,
        note: data.data.note,
        pageNumber: data.data.page_number,
        price: data.data.price,
        publishName: data.data.publish_name,
        publishingYear: data.data.publishing_year,
        status: data.data.status,
      }
    })
  }

  getByPopularDetailBook(bookId: number) {
    console.log(bookId)
  }

  onHeader() {
    window.scrollTo(0, 400)
  }
}
