import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILoginRequest} from "../../../models/requests/login.requests";
import {AuthApiService} from "../../../services/api/auth-api.service";
import {IResponseModel} from "../../../models/commons/response.model";
import {ILoginResponse} from "../../../models/response/login.response";
import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AccountService} from "../../../services/account.service";
import {Constant} from "../../util/constant";
declare function returnForm(): any


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showEye : boolean =false
  loginForm: FormGroup
  submitted: boolean = false
  passwordRegex = Constant.REGEX_PASSWORD_FOR_VALIDATOR
  constructor(private fb: FormBuilder,
              private authApiService: AuthApiService,
              private TokenService: TokenService,
              private router: Router,
              private messageService: MessageService,
              private accountService: AccountService
              ) {



    this.loginForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      // password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]]
      password: [null, [Validators.required,]]
    })
  }
  ngOnInit(): void {
  }

  login() {
    this.submitted = true
    if(this.loginForm.invalid) {
      console.log('form invalid')
      returnForm()
      return
    }
    const loginRequest: ILoginRequest = {
      email:  this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authApiService._login(loginRequest).subscribe(
      (res: IResponseModel<ILoginResponse>) => {
        this.messageService.add({severity:'success', summary:'Thông báo', detail: "Đăng nhập thành công!"})
        this.router.navigate(['/pages/home/']);
        this.TokenService.setKey(JSON.stringify(res.data.token))
        this.accountService.reloadAccountInfo()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo', detail: 'Sai tên đăng nhập hoặc mật khẩu'})
        this.loginForm.reset()
        returnForm()
        console.log(err)
      }
    )
  }


}
