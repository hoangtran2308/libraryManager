import {EventEmitter, Injectable} from "@angular/core";


import {IAccountViewModal} from "../../models/views/account.view";
import {GetOneAccApiService} from "../api/getOneAcc.service";
import {Constant} from "../../util/constant";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private currentAccount = new BehaviorSubject<IAccountViewModal>(Constant.NULL_VALUE)

  constructor(private accountApiService: GetOneAccApiService) {
    this.getAccountFromApi()
  }

  getAccountFromApi() {
    this.accountApiService._getOneAcc().subscribe(data => {
      const accountData: IAccountViewModal = {
        account_id: data.data.account_id,
        role_id: data.data.role_id,
        username: data.data.username,
        password: data.data.password,
        phone: data.data.phone,
        email: data.data.email,
        full_name: data.data.full_name,
        creat_date: data.data.creat_date,
        update_date: data.data.update_date,
        date_of_birth: data.data.date_of_birth,
        code_role: data.data.code_role
      }
      this.currentAccount.next(accountData)
    })
  }

  getCurrentAccount() {
    return this.currentAccount.asObservable()
  }
}
