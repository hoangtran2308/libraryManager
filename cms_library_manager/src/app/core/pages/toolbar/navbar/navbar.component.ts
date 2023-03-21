import { Component, OnInit } from '@angular/core';
import {Token} from "@angular/compiler";
import {TokenService} from "../../../../services/token.service";
import {IResponseModel} from "../../../../models/commons/response.model";
import {GetOneAccApiService} from "../../../../services/api/getOneAcc.service";

import {FormBuilder, FormGroup} from "@angular/forms";
import {IAccountViewModal} from "../../../../models/views/account.view";
import {AccountService} from "../../../../services/intercept/account.service";
import {AuthApiService} from "../../../../services/api/auth-api.service";
declare function toggleMenu(): any
declare function clickMenuMobile(): any
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  getOneAccInfoForm!: FormGroup
  currentAccount!: IAccountViewModal
  // changePasswordForm: FormGroup


  constructor(
    private getOneApiService: GetOneAccApiService,
    private tokenService: TokenService,
    private accountService: AccountService,
    private authApiService: AuthApiService,
    // private fb: FormBuilder
    ) {
    // this.changePasswordForm = fb.group({
    //   new_password: [null],
    //   old_password: [null],
    //   re_password: [null]
    // })
  }

  ngOnInit(): void {
    this.getCurrentAccount()
  }
  toggleMenu() {
    toggleMenu()
  }
  logout() {
    this.tokenService.clearKey()
  }

  onClickMenu() {

  }

  getCurrentAccount() {
    this.accountService.getCurrentAccount().subscribe(
      res => {
        if(res) {
          this.currentAccount = res
          console.log(this.currentAccount)
        }
      }
    )
  }
}
