import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {IPageResponseModel, IResponseModel} from 'src/app/models/commons/response.model';
import {IEditActionRequest, IEditLoanpayRequest, ILoanpayRequest} from 'src/app/models/requests/loanpay.request';
import { IBookManagerResponse } from 'src/app/models/responses/book-manager.response';
import { ILoanpayResponse } from 'src/app/models/responses/loanpay.response';
import { IAccountManagerView } from 'src/app/models/views/account-manager.view';
import { IBookManagerView } from 'src/app/models/views/book-manager.view';
import { ILoanpayView } from 'src/app/models/views/loanpay.view';
import { LoanpayApiService } from 'src/app/services/api/loanpay-api.service';
import {BookApiService} from 'src/app/services/api/book-api.service';
import {AccountApiService} from "../../../../services/api/account-api.service";
import {StaffManagerApiService} from "../../../../services/api/staff-manager-api.service";
import { IAccountManagerResponse } from 'src/app/models/responses/account-manager.response';
import { IStaffManagerView } from 'src/app/models/views/staff-manager.view';
import { IStaffManagerResponse } from 'src/app/models/responses/staff-manager.response';
import {Constant} from "../../../../util/constant";
import {finalize} from "rxjs";
import {IActionResponseNew} from "../../../../models/responses/action.response";
import {IStatusResponse} from "../../../../models/responses/status.response";
import {IActionView} from "../../../../models/views/action.view";

@Component({
  selector: 'app-loan-pay-manager-list',
  templateUrl: './loan-pay-manager-list.component.html',
  styleUrls: ['./loan-pay-manager-list.component.css']
})
export class LoanPayManagerListComponent implements OnInit {
  nameSelect = 'Hành động'
  loanPayManager : ILoanpayView[] = []
  loanpayInfoForm!: FormGroup
  loanpaySelected!: ILoanpayView
  actionSelected!: IActionView
  listBook: IBookManagerView []=[]
  listAccount: IAccountManagerView []=[]
  listStaff: IStaffManagerView []=[]
  listAction: IActionResponseNew []=[
  {
    id:1,
    action:"Đang trong thời gian mượn",
  },
  {
    id:2,
    action:"Đã trả",
  },
    {
      id:3,
      action:"Vi phạm",
    }


]
  listStatus: IStatusResponse [] = [
    {
      id_status: 0,
      valueStatus: 'Chưa duyệt'
    },
    {
      id_status: 1,
      valueStatus: 'Đã duyệt'
    },
    {
      id_status: 2,
      valueStatus: 'Không cho mượn'
    }
  ]
  usernameSearch!: string
  staffSearch!: string;
  isActionSearch!: string
  statusSearch!: string
  page: number = Constant.PAGE_INIT
  size: number = Constant.SIZE_INIT
  totalElement: number = 0
  // categoryId!: number
  // authorId!: number
  first: number = 0
  loading: boolean = true;
  searchUsername! : string[];


  constructor(private loanpayApiService: LoanpayApiService,
              private messageService: MessageService,
              private BookApiService: BookApiService,
              private AccountApiService : AccountApiService,
              private StaffManagerApiService: StaffManagerApiService,
              private fb: FormBuilder
              ) {
    this.loanpayInfoForm = fb.group({
      amount: [null],
      note: [null],
      status: [null],
      call_card_details_id: [null],
      book_id: [null],
      card_number: [null],
      staff_id: [null],
      start_date: [null],
      end_date: [null],
      call_card_id: [null],
      account_id: [null],
      is_action: [null]
    })
  }


  ngOnInit(): void {
    // this.getAllLoanpay();
    this.onSearch()
    this.getAllBook();
    this.getAllAccountManager();
    this.getAllStaffManager();

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
            account_id: loanpayRes.account_id,
            book_id: loanpayRes.book_id,
            is_action: loanpayRes.is_action
          }
          this.loanPayManager.push(loanpayView)
        })
      }
    )
  }

 // add
  onAddNewLoanpay() {
    const createNewLoanpayRequest: ILoanpayRequest = {
      account_id: this.loanpayInfoForm.value.account_id,
      amount: this.loanpayInfoForm.value.amount,
      book_id: this.loanpayInfoForm.value.book_id,
      call_card_id: this.loanpayInfoForm.value.call_card_id,
      end_date: this.loanpayInfoForm.value.end_date,
      note: this.loanpayInfoForm.value.note,
      staff_id: this.loanpayInfoForm.value.staff_id
    }

    this.loanpayApiService._createNewLoanpay(createNewLoanpayRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo', detail:'Thêm mới danh mục thành công'});
        console.log('Them moi danh muc thanh cong')
        this.onReset()
      },
      err => {
        console.log(err);
        this.messageService.add({severity:'error', summary:'Thông báo', detail:'Thêm mới danh mục thất bại'});
        console.log('Them moi danh muc that bai')
      }
    )
  }

  onDeleteLoanpay() {
    if(this.loanpaySelected) {
      this.loanpayApiService._deleteLoanpay(this.loanpaySelected.call_card_id).subscribe(
        (res: IResponseModel<any>) => {
          console.log('Xoa danh muc thanh cong')
          this.messageService.add({severity:'success', summary:'Thông báo', detail:'Xóa danh mục thành công'});
          this.onSearch()
        },
        err => {
          this.messageService.add({severity:'error', summary:'Thông báo', detail:'Xoa danh muc that bai'});
          console.log('Xoa danh muc that bai')
        }
      )
    }
  }

  //edit
  editLoanpay(i: ILoanpayView) {
    this.loanpaySelected = i,
    this.loanpayInfoForm.patchValue(
      {
        call_card_id: i.call_card_id,
        username: i.username,
        staff_id: i.staff_id,
        name_staff: i.name_staff,
        status: i.status,
        note: i.note,
        start_date: i.start_date,
        end_date: i.end_date,
        account_id: i.account_id,
        amount: i.amount,
        book_id: i.book_id,
        book_name: i.book_name,

      }
    )
  }

  onEditLoanpay() {
    const editLoanpayRequest: IEditLoanpayRequest = {
      account_id: this.loanpayInfoForm.value.account_id,
      amount: this.loanpayInfoForm.value.amount,
      book_id: this.loanpayInfoForm.value.book_id,
      call_card_id: this.loanpayInfoForm.value.call_card_id,
      end_date: this.loanpayInfoForm.value.end_date,
      note: this.loanpayInfoForm.value.note,
      staff_id: this.loanpayInfoForm.value.staff_id,
      status: this.loanpayInfoForm.value.status,
    }

    this.loanpayApiService._editLoanpay(editLoanpayRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo', detail:'Chỉnh sửa danh mục thành công'});
        console.log('Sua danh muc thanh cong')
       this.onSearch()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo', detail:'Chỉnh sửa danh mục thất bại'});
        console.log('Sua danh muc that bai')
      }
    )
  }


  // edit action
  editIsAction(i: ILoanpayView) {
    this.loanpaySelected = i,
      this.loanpayInfoForm.patchValue(
        {
          call_card_id: i.call_card_id,
          is_action: i.is_action
        }
      )
  }
  onEditAction() {
    const editLoanpayRequest: IEditActionRequest = {
      call_card_id: this.loanpayInfoForm.value.call_card_id,
      type: this.loanpayInfoForm.value.is_action
    }

    this.loanpayApiService._editAction(editLoanpayRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo', detail:'Chỉnh sửa danh mục thành công'});
        console.log('Sua danh muc thanh cong')
        this.onSearch()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo', detail:'Chỉnh sửa danh mục thất bại'});
        console.log('Sua danh muc that bai')
      }
    )
  }

  selectLoanpay(i: ILoanpayView) {
    this.loanpaySelected = i
  }

  //get detailes : book_name,amount
  getAllBook() {
    this.BookApiService._getAllBook().subscribe(
      (res: IResponseModel<IBookManagerResponse[]>) => {
        console.log(res)
        this.listBook = []
        res.data.forEach(bookManagerRes => {
          const bookManagerView: IBookManagerView = {
            book_id: bookManagerRes.book_id,
            book_name: bookManagerRes.book_name,
            name_author: bookManagerRes.name_author,
            publishing_year: bookManagerRes.publishing_year,
            page_number: bookManagerRes.page_number,
            image: bookManagerRes.image,
            price: bookManagerRes.price,
            category_name: bookManagerRes.category_name,
            publish_name: bookManagerRes.publish_name,
            amount: bookManagerRes.amount,
            status: bookManagerRes.status,
            note: bookManagerRes.note,
            id_author: bookManagerRes.id_author,
            company_id: bookManagerRes.company_id,
            id_type_book: bookManagerRes.id_type_book
          }
          this.listBook.push(bookManagerView)
        })
      }
    )
  }


//  getAll account
  getAllAccountManager() {
    this.AccountApiService._getAllAccountManager().subscribe(
      (res: IResponseModel<IAccountManagerResponse[]>) => {
        this.listAccount = [];
        res.data.forEach(accountManagerRes => {
          const accountManagerView: IAccountManagerView = {
            id: accountManagerRes.account_id,
            username: accountManagerRes.username,
            password: accountManagerRes.password,
            full_name: accountManagerRes.full_name,
            date_of_birth: accountManagerRes.date_of_birth,
            email: accountManagerRes.email,
            phone: accountManagerRes.phone,
            roleCode: accountManagerRes.code_role,
            roleId: accountManagerRes.role_id
          };
          this.listAccount.push(accountManagerView)
        })
      }
    )
  }


//  getAll staff
  getAllStaffManager() {
    this.StaffManagerApiService._getAllStaffManager().subscribe(
      (res: IResponseModel<IStaffManagerResponse[]>)  => {
        this.listStaff = [];
        res.data.forEach( staffManagerRes => {
          const staffManagerView: IStaffManagerView = {
            id: staffManagerRes.staff_id,
            name: staffManagerRes.name_staff,
            phoneNum: staffManagerRes.phone_number,
            address: staffManagerRes.address,
            dateOfBirth: staffManagerRes.date_of_birth
          };
          this.listStaff.push(staffManagerView)
        })
      }
    )
  }
// search + phân trang + getAll
  onSearch() {
    const searchRequest = {
      username: this.usernameSearch,
      page: this.page,
      size: this.size,
      nameStaff: this.staffSearch,
      isAction: this.isActionSearch,
      status: this.statusSearch
      // categoryId: this.categoryId,
      // authorId: this.authorId
    }
    console.log(searchRequest)
    this.loanpayApiService._searchLoanpay(searchRequest)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
      (res: IResponseModel<IPageResponseModel<ILoanpayResponse>>) => {
        console.log(res)
        this.totalElement = res.data.total_elements
        this.loanPayManager = []
        res.data.results.forEach(loanpayRes => {
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
            account_id: loanpayRes.account_id,
            book_id: loanpayRes.book_id,
            is_action: loanpayRes.is_action,
          }
          this.loanPayManager.push(loanpayView)
        })
      }
    )
  }
  onReset() {
    this.usernameSearch = Constant.NULL_VALUE
    this.page = Constant.PAGE_INIT
    this.size = Constant.SIZE_INIT
    this.staffSearch = Constant.NULL_VALUE,
      this.statusSearch = Constant.NULL_VALUE,
      this.isActionSearch = Constant.NULL_VALUE
    this.first = 0
    this.onSearch()
  }


  pageChange($event: any) {
    // @ts-ignore
    this.page = $event.first/$event.rows
    // @ts-ignore
    this.size = $event.rows
    // @ts-ignore
    // this.selectedSortField = $event.sortField
    // this.selectedSortOrder = $event.sortOrder == 1? 'ACS' : 'DESC'
    console.log($event)
    this.onSearch()
  }

//  search autotemplete username
  searchUserLoanPay(keyword: string): string[] {
    let names: string[] = [];
    for (let i = 0; i < this.loanPayManager.length; i++){
      if (this.loanPayManager[i].username.includes(keyword)){
        names.push(this.loanPayManager[i].username);
      }
    }
    return names
  }

  onSearchUsernameLoanPay(event : any) {
    console.log(event.query)
    this.searchUsername = this.searchUserLoanPay(event.query)
    this.onSearch()
  }

}

// function editLoanpayRequest(editLoanpayRequest: any) {
//     throw new Error('Function not implemented.');
// }
//
