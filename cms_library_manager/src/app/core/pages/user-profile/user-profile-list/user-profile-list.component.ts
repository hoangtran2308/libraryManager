import {Component, OnInit} from '@angular/core';

import {GetOneAccApiService} from "../../../../services/api/getOneAcc.service";
import {IStaffManagerView} from "../../../../models/views/staff-manager.view";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../../services/intercept/account.service";
import {IAccountViewModal} from "../../../../models/views/account.view";
import {IAccountManagerView} from "../../../../models/views/account-manager.view";
import {IEditAccountManagerRequest} from "../../../../models/requests/account-manager.request";
import {IResponseModel} from "../../../../models/commons/response.model";
import {MessageService} from "primeng/api";
import {ILoanpayView} from "../../../../models/views/loanpay.view";

@Component({
  selector: 'app-user-profile-list',
  templateUrl: './user-profile-list.component.html',
  styleUrls: ['./user-profile-list.component.css']
})
export class UserProfileListComponent implements OnInit {


  accInfoForm!: FormGroup;
  account_id!: number
  staffManagerSelected!: IStaffManagerView;
  currentAccount!: IAccountViewModal;
  accountSelected!: IAccountViewModal;


  constructor(private getOneAccApiService: GetOneAccApiService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private accountService: AccountService,
              private messageService: MessageService,) {

    this.accInfoForm = this.fb.group({
      account_id: [null],
      role_id: [null],
      username: [null],
      password: [null],
      phone: [null],
      email: [null],
      full_name: [null],
      creat_date: [null],
      update_date: [null],
      date_of_birth: [null],
      code_role: [null]
    })
  }

  ngOnInit(): void {
    // this.getOneAcc()
    this.getCurrentAccount()
  }

  getCurrentAccount() {
    this.accountService.getCurrentAccount().subscribe(
      res => {
        if (res) {
          this.currentAccount = res
          console.log(this.currentAccount)
        }
      }
    )
  }

  editAccount(i: IAccountViewModal) {
    this.accountSelected = i,
    this.accInfoForm.patchValue(
      {
        account_id: i.account_id,
        role_id: i.role_id,
        username: i.username,
        password: i.password,
        phone: i.phone,
        email: i.email,
        full_name: i.full_name,
        creat_date: i.creat_date,
        update_date: i.update_date,
        date_of_birth: i.date_of_birth,
        code_role: i.code_role
      }
    )
  }
  selectAcc(i: IAccountViewModal) {
    this.accountSelected = i
  }


  onEditAccount() {
    const editAccountManagerRequest: IEditAccountManagerRequest = {
      username: this.accInfoForm.value.username,
      password: this.accInfoForm.value.password,
      full_name: this.accInfoForm.value.full_name,
      dob: this.accInfoForm.value.date_of_birth,
      email: this.accInfoForm.value.email,
      phone: this.accInfoForm.value.phone,
      role_id: this.accInfoForm.value.role_id,
      id: this.accountSelected.account_id
    };
      this.getOneAccApiService._editAccount(editAccountManagerRequest).subscribe(
        (res: IResponseModel<any>) => {
          this.messageService.add({severity: 'success', summary: 'Thông báo!', detail: 'Chỉnh sửa thành công! '});
          console.log('Thay doi thong tin thanh cong');
          this.getCurrentAccount()
        },
        err => {
          this.messageService.add({severity: 'error', summary: 'Thông báo!', detail: 'Chỉnh sửa thất bại! '});
          console.log('Thay doi thong tin that bai')
        }
      )
    }
}
