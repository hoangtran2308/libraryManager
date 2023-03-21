import {EventEmitter, Injectable} from "@angular/core";
import {GetAccountApiService} from "./api/account-api.service";
import {IAccountViewModal} from "../models/view/account.view";
import {Constant} from "../app/util/constant";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private currentAccount = new BehaviorSubject<IAccountViewModal>(Constant.NULL_VALUE)

  constructor(private accountApiService: GetAccountApiService) {
    this.reloadAccountInfo()
  }

  reloadAccountInfo() {
    this.accountApiService._getIdAccount().subscribe(data => {
      const accountData: IAccountViewModal = {
        accountId: data.data.account_id,
        roleId: data.data.role_id,
        username: data.data.username,
        password: data.data.password,
        phone: data.data.phone,
        email: data.data.email,
        fullName: data.data.full_name,
        createDate: data.data.creat_date,
        updateDate: data.data.update_date,
        dateOfBirth: data.data.date_of_birth,
        codeRole: data.data.code_role
      }
      this.currentAccount.next(accountData)
    })
  }

  getCurrentAccount(): Observable<IAccountViewModal> {
    return this.currentAccount.asObservable()
  }
}
