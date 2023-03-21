import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../../services/account.service";
import {GetAccountApiService} from "../../../../services/api/account-api.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import {IAccountViewModal} from "../../../../models/view/account.view";
import {IEditAccountRequest} from "../../../../models/requests/account.request";
import {IResponseModel} from "../../../../models/commons/response.model";

@Component({
  selector: 'app-user-profile-list',
  templateUrl: './user-profile-list.component.html',
  styleUrls: ['./user-profile-list.component.css']
})
export class UserProfileListComponent implements OnInit {
  showChangePassword: boolean = false;
  currentAccount: any;
  accountInfoForm!: FormGroup;
  accountSelected!:IAccountViewModal;

  constructor(private accountService: AccountService,
              private getAccountApiService: GetAccountApiService,
              private fb: FormBuilder,
              private messageService: MessageService) {
    this.accountInfoForm = fb.group({
      fullName: [null],
      username: [null],
      dateOfBirth: [null],
      email: [null],
      phone: [null],
      roleId: [null],
      accountId: [null],
      createDate: [null],
      updateDate: [null],
      codeRole: [null]
    })
  }

  ngOnInit(): void {
    this.getCurrentAccount()
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

  // selectAccount(i: IAccountViewModal) {
  //   this.accountSelected = i;
  // }

  editAccount(i: IAccountViewModal) {
    this.accountSelected = i;
    this.accountInfoForm.patchValue(
      {
        fullName: i.fullName,
        username: i.username,
        dateOfBirth: i.dateOfBirth,
        email: i.email,
        roleId: i.roleId,
        accountId: i.accountId,
        phone: i.phone
      }
    )
  }

  onEditAccountInfo() {
    const editAccountInfoRequest : IEditAccountRequest = {
        full_name: this.accountInfoForm.value.fullName,
        username: this.accountInfoForm.value.username,
        dob: this.accountInfoForm.value.dateOfBirth,
        email: this.accountInfoForm.value.email,
        phone: this.accountInfoForm.value.phone,
        role_id: this.accountInfoForm.value.roleId,
        id: this.accountSelected.accountId
    };
    this.getAccountApiService._editAccount(editAccountInfoRequest).subscribe(
      (res: IResponseModel<any> ) => {
        this.messageService.add({severity: 'success', summary: 'Thông báo!', detail: 'Cập nhật thành công! '});
        console.log('thanh cong');
        this.getCurrentAccount()
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Thông báo!', detail: 'Cập nhật thất bại! '});
        console.log('that bai')
      }
    )

  }
  showModal() {
    console.log(this.showChangePassword)
    this.showChangePassword = true
  }

}
