import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ICollectMoneyView} from "../../../../models/views/collect-money.view";
import {CollectMoneyApiService} from "../../../../services/api/collect-money-api.service";
import {IPageResponseModel, IResponseModel} from "../../../../models/commons/response.model";
import {ICollectMoneyResponses} from "../../../../models/responses/collect-money.response";
import {ICollectMoneyRequests, IEditCollectMoneyRequests} from "../../../../models/requests/collect-money.requests";
import {MessageService} from "primeng/api";
import {IStaffManagerView} from "../../../../models/views/staff-manager.view";
import {StaffManagerApiService} from "../../../../services/api/staff-manager-api.service";
import {IStaffManagerResponse} from "../../../../models/responses/staff-manager.response";
import {IAccountManagerView} from "../../../../models/views/account-manager.view";
import {IAccountManagerResponse} from "../../../../models/responses/account-manager.response";
import {AccountApiService} from "../../../../services/api/account-api.service";
import {Constant} from "../../../../util/constant";
import {finalize} from "rxjs";

@Component({
  selector: 'app-delinquent-manager-list',
  templateUrl: './delinquent-manager-list.component.html',
  styleUrls: ['./delinquent-manager-list.component.css']
})
export class DelinquentManagerListComponent implements OnInit {

  delinquentManager : ICollectMoneyView[] = [];
  moneyInfoForm!: FormGroup;
  collectMoneySelected!: ICollectMoneyView;
  listStaffManager: IStaffManagerView[] = [];
  listAccount: IAccountManagerView[] = [];
  fullNameSearch!: string
  usernameSearch!: string;
  nameStaff!: string
  page: number = Constant.PAGE_INIT
  size: number = Constant.SIZE_INIT
  staffId: number | null = null
  totalElement: number = 0
  first: number = 0
  loading: boolean = true;
  selectedSortOrder!: string;
  selectedSortField!: string

  constructor(private collectMoneyApiService: CollectMoneyApiService,
              private fb:FormBuilder,
              private messageService: MessageService,
              private staffManagerApiService: StaffManagerApiService,
              private accountApiService: AccountApiService) {
    this.moneyInfoForm = fb.group({
      finedAmount: [null],
      proceeds: [null],
      staffId: [null],
      userId: [null]
    })
  }
  ngOnInit(): void {
    // this.getAllCollectMoney();
    this.onSearch()
    this.getAllStaffManager();
    this.getAllAccountManager()
  }

  getAllCollectMoney() {
    this.collectMoneyApiService._getAllCollectMoney().subscribe(
      (res: IResponseModel<ICollectMoneyResponses[]>) => {
        this.delinquentManager = [];
        res.data.forEach( collectMoneyRes => {
          const collectMoneyView: ICollectMoneyView = {
            id: collectMoneyRes.collect_money_id,
            fullName: collectMoneyRes.full_name,
            finedAmount: collectMoneyRes.fined_amount,
            proceeds: collectMoneyRes.proceeds,
            staffId: collectMoneyRes.staff_id,
            userId: collectMoneyRes.account_id,
            username: collectMoneyRes.user_name,
            staff_name: collectMoneyRes.staff_name

          };
          this.delinquentManager.push(collectMoneyView)
        })
      }
    )
  }

  onAddNewCollectMoney() {
    const createNewCollectMoneyRequest: ICollectMoneyRequests = {
      fined_amount: this.moneyInfoForm.value.finedAmount,
      proceeds: this.moneyInfoForm.value.proceeds,
      staff_id: this.moneyInfoForm.value.staffId,
      account_id: this.moneyInfoForm.value.userId
    };
    this.collectMoneyApiService._createNewCollectMoney(createNewCollectMoneyRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo!', detail:'Tạo mới thành công! '});
        console.log('Success');
        this.onReset()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo!', detail:'Tạo thất bại! '});
        console.log('Failed');

      }
    )
  }

  onDeleteAccount() {
    if(this.collectMoneySelected) {
      this.collectMoneyApiService._deleteCollectMoney(this.collectMoneySelected.id).subscribe(
        (res: IResponseModel<any>) => {
          this.messageService.add({severity:'success', summary:'Thông báo!', detail:'Xóa thành công! '});
          console.log('Xoa tai khoan thanh cong');
          this.onSearch()
        },
        err => {
          this.messageService.add({severity:'error', summary:'Thông báo!', detail:'Xóa thất bại! '});
          console.log('Xoa tai khoan that bai')
        }
      )
    }
  }

  onEditCollectMoney() {
    const editCollectMoneyRequests: IEditCollectMoneyRequests = {
      fined_amount: this.moneyInfoForm.value.finedAmount,
      proceeds: this.moneyInfoForm.value.proceeds,
      staff_id: this.moneyInfoForm.value.staffId,
      account_id: this.moneyInfoForm.value.userId,
      id: this.collectMoneySelected.id
    };
    this.collectMoneyApiService._editCollectMoney(editCollectMoneyRequests).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo!', detail:'Chỉnh sửa thành công! '});
        console.log('Thay doi thong tin thanh cong');
       this.onSearch()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo!', detail:'Chỉnh sửa thất bại! '});
        console.log('Thay doi thong tin thanh cong');
      }
    )
  }

  editCollectMoney(i: ICollectMoneyView) {
    this.collectMoneySelected = i;
    this.moneyInfoForm.patchValue(
      {
        userId: i.userId,
        finedAmount: i.finedAmount,
        fullName: i.fullName,
        proceeds: i.proceeds,
        staffId: i.staffId,
        username: i.username,

    })
  }

  selectCollectMoney(i: ICollectMoneyView) {
    this.collectMoneySelected = i
  }

  getAllStaffManager() {
    this.staffManagerApiService._getAllStaffManager().subscribe(
      (res: IResponseModel<IStaffManagerResponse[]>)  => {
        this.listStaffManager = [];
        res.data.forEach( staffManagerRes => {
          const staffManagerView: IStaffManagerView = {
            id: staffManagerRes.staff_id,
            name: staffManagerRes.name_staff,
            phoneNum: staffManagerRes.phone_number,
            address: staffManagerRes.address,
            dateOfBirth: staffManagerRes.date_of_birth
          };
          this.listStaffManager.push(staffManagerView)
        })
      }
    )
  }

  getAllAccountManager() {
    this.accountApiService._getAllAccountManager().subscribe(
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

  onSearch() {
    const searchRequest = {
      username: this.usernameSearch,
      page: this.page,
      size: this.size,
      staffId: this.staffId,
      fullName: this.fullNameSearch,
      sortField: this.selectedSortField,
      sortOrder: this.selectedSortField ? this.selectedSortOrder : undefined
      // categoryId: this.categoryId,
      // authorId: this.authorId
    }
    console.log(searchRequest)
    this.collectMoneyApiService._searchColect(searchRequest)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
      (res: IResponseModel<IPageResponseModel<ICollectMoneyResponses>>) => {
        console.log(res)
        this.totalElement = res.data.total_elements
        this.delinquentManager = []
        res.data.results.forEach(collectMoneyRes => {
          const collectMoneyView: ICollectMoneyView = {
            id: collectMoneyRes.collect_money_id,
            fullName: collectMoneyRes.full_name,
            finedAmount: collectMoneyRes.fined_amount,
            proceeds: collectMoneyRes.proceeds,
            staffId: collectMoneyRes.staff_id,
            userId: collectMoneyRes.account_id,
            username: collectMoneyRes.user_name,
            staff_name: collectMoneyRes.staff_name
          };
          this.delinquentManager.push(collectMoneyView)
        })
      }
    )
  }


  selectCategory() {
    console.log(this.staffId)
  }
  onReset() {
    this.usernameSearch = Constant.NULL_VALUE
    this.page = Constant.PAGE_INIT
    this.size = Constant.SIZE_INIT
    this.staffId = Constant.NULL_VALUE
    this.fullNameSearch = Constant.NULL_VALUE
    this.first = 0
    this.selectedSortOrder = Constant.NULL_VALUE
    this.selectedSortField = Constant.NULL_VALUE
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
