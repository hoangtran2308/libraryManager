import { Component, OnInit } from '@angular/core';
import {AccountApiService} from "../../../../services/api/account-api.service";
import {IPageResponseModel, IResponseModel} from "../../../../models/commons/response.model";

import {IAccountManagerResponse} from "../../../../models/responses/account-manager.response";
import {IAccountManagerView} from "../../../../models/views/account-manager.view";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IAccountManagerRequest, IEditAccountManagerRequest} from "../../../../models/requests/account-manager.request";
import {IRoleManagerView} from "../../../../models/views/role-manager.view";
import {MessageService} from "primeng/api";
import {RoleManagerApiService} from "../../../../services/api/role-manager-api.service";
import {IRoleManagerResponse} from "../../../../models/responses/role-manager.response";
import {Constant} from "../../../../util/constant";
import {finalize} from "rxjs";

@Component({
  selector: 'app-acc-manager-list',
  templateUrl: './acc-manager-list.component.html',
  styleUrls: ['./acc-manager-list.component.css']
})
export class AccManagerListComponent implements OnInit {


  accManager: IAccountManagerView[] = [];
  accountInfoForm!: FormGroup;
  accountSelected!: IAccountManagerView;
  listRoleManager: IRoleManagerView[] = [];
  usernameSearch!: string;
  fullNameSearch!: string;
  emailSearch!: string;
  roleIdSearch: number | null = null;
  page: number = Constant.PAGE_INIT
  size: number = Constant.SIZE_INIT
  totalElement: number = 0
  first: number = 0
  loading: boolean = true;
  selectedSortField!: string
  selectedSortOrder!: string
  //Auto complete
  usernameComplete!: string[];
  fullNameComplete!: string[];
  emailComplete!: string[];

  constructor(private accountApiService: AccountApiService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private roleManagerApiService: RoleManagerApiService) {
    this.accountInfoForm = fb.group({
      username: [null],
      password: [null],
      full_name: [null],
      date_of_birth: [null],
      email: [null],
      phone: [null],
      role_id: [null]
    })
  }

  ngOnInit(): void {
    // this.getAllAccountManager();
    this.onSearch();
    this.getAllRoleManager();
  }

  getAllAccountManager() {
    this.accountApiService._getAllAccountManager().subscribe(
      (res: IResponseModel<IAccountManagerResponse[]>) => {
        this.accManager = [];
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
          this.accManager.push(accountManagerView)
        })
      }
    )
  }

  onAddNewAccount() {
    const createNewAccountRequest: IAccountManagerRequest = {
      username: this.accountInfoForm.value.username,
      password: this.accountInfoForm.value.password,
      full_name: this.accountInfoForm.value.full_name,
      dob: this.accountInfoForm.value.date_of_birth,
      email: this.accountInfoForm.value.email,
      phone: '0' + this.accountInfoForm.value.phone,
      role_id: this.accountInfoForm.value.role_id
    };
    this.accountApiService._createNewAccount(createNewAccountRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity: 'success', summary: 'Thông báo!', detail: 'Tạo tài khoản thành công! '});
        console.log('Tao tai khoan thanh cong');
        this.onReset()
      },
      err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thông báo!', detail: err.error});
        console.log('Tao tai khoan that bai')
      }
    )
  }

  onDeleteAccount() {
    if (this.accountSelected) {
      this.accountApiService._deleteAccount(this.accountSelected.id).subscribe(
        (res: IResponseModel<any>) => {
          this.messageService.add({severity: 'success', summary: 'Thông báo!', detail: 'Xóa thành công! '});
          console.log('Xoa tai khoan thanh cong');
         this.onSearch()
        },
        err => {
          this.messageService.add({severity: 'error', summary: 'Thông báo!', detail: 'Xóa thất bại! '});
          console.log('Xoa tai khoan that bai')
        }
      )
    }
  }

  editAccount(i: IAccountManagerView) {
    this.accountSelected = i;
    console.log(this.accountSelected)
    this.accountInfoForm.patchValue(
      {
        username: i.username,
        full_name: i.full_name,
        password: i.password,
        date_of_birth: i.date_of_birth,
        email: i.email,
        phone: i.phone,
        role_id: i.roleId
      }
    )
  }

  onEditAccount() {
    const editAccountManagerRequest: IEditAccountManagerRequest = {
      username: this.accountInfoForm.value.username,
      password: this.accountInfoForm.value.password,
      full_name: this.accountInfoForm.value.full_name,
      dob: this.accountInfoForm.value.date_of_birth,
      email: this.accountInfoForm.value.email,
      phone: this.accountInfoForm.value.phone,
      role_id: this.accountInfoForm.value.role_id,
      id: this.accountSelected.id
    };
    this.accountApiService._editAccount(editAccountManagerRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity: 'success', summary: 'Thông báo!', detail: 'Chỉnh sửa thành công! '});
        console.log('Thay doi thong tin thanh cong');
       this.onSearch()
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Thông báo!', detail: 'Chỉnh sửa thất bại! '});
        console.log('Thay doi thong tin that bai')
      }
    )
  }

  selectAccount(i: IAccountManagerView) {
    this.accountSelected = i;
    console.log(this.accountSelected)
  }


  getAllRoleManager() {
    this.roleManagerApiService._getAllRoleManager().subscribe(
      (res: IResponseModel<IRoleManagerResponse[]>) => {
        this.listRoleManager = [];
        res.data.forEach(roleManagerRes => {
          const roleManagerView: IRoleManagerView = {
            id: roleManagerRes.roleId,
            code: roleManagerRes.codeRole,
            name: roleManagerRes.name
          };
          this.listRoleManager.push(roleManagerView)
        })
      }
    )
  }


  onSearch() {
    const searchRequest = {
      username: this.usernameSearch,
      fullName: this.fullNameSearch,
      email: this.emailSearch,
      roleId: this.roleIdSearch,
      page: this.page,
      size: this.size,
      sortField: this.selectedSortField,
      sortOrder: this.selectedSortField ? this.selectedSortOrder : undefined
    }
    console.log(searchRequest)
    this.accountApiService._searchAccount(searchRequest)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
      (res: IResponseModel<IPageResponseModel<IAccountManagerResponse>>) => {
        console.log(res)
        this.totalElement = res.data.total_elements
        this.accManager = [];
        res.data.results.forEach(accountManagerRes => {
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
          this.accManager.push(accountManagerView)
        })
        console.log(this.accManager)
      }
    )
  }

  selectRole() {
    console.log(this.roleIdSearch)
  }
  onReset() {
    this.usernameSearch = Constant.NULL_VALUE
    this.page = Constant.PAGE_INIT
    this.size = Constant.SIZE_INIT
    this.fullNameSearch = Constant.NULL_VALUE
    this.emailSearch = Constant.NULL_VALUE
    this.roleIdSearch = Constant.NULL_VALUE
    this.selectedSortField = Constant.NULL_VALUE
    this.selectedSortOrder= Constant.NULL_VALUE
    this.onSearch()
    this.first = 0
  }

  pageChange($event: any) {
    // @ts-ignore
    this.page = $event.first/$event.rows
    // @ts-ignore
    this.size = $event.rows
    // @ts-ignore
    this.selectedSortOrder = $event.sortOrder == 1? 'ASC' : 'DESC'
    // @ts-ignore
    this.selectedSortField = $event.sortField
    console.log($event)
    this.onSearch()
  }

  onSearchUsername(keyword: string): string[] {
    let names: string[] = [];
    for (let i = 0; i< this.accManager.length; i++){
      if (this.accManager[i].username.includes(keyword)){
        names.push(this.accManager[i].username)
      }
    }
    return names
  }
  searchUsername(event: any) {
    this.usernameComplete = this.onSearchUsername(event.query)

  }

  onSearchFullName(keyword: string): string[] {
    let fullName: string[] = [];
    for (let i = 0; i < this.accManager.length; i++) {
      if( this.accManager[i].full_name.includes(keyword)) {
        fullName.push(this.accManager[i].full_name)
      }
    }
    return fullName
  }
  searchFullName(event: any) {
    this.fullNameComplete = this.onSearchFullName(event.query)

  }

  onSearchEmail(keyword: string): string[] {
    let email: string[] = [];
    for (let i = 0; i < this.accManager.length; i++) {
      if( this.accManager[i].email.includes(keyword)) {
        email.push(this.accManager[i].email)
      }
    }
    return email
  }

  searchEmail(event: any) {
    this.emailComplete = this.onSearchEmail(event.query)

  }
}
