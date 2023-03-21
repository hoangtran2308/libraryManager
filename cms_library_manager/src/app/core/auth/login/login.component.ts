import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {ILoginResponse} from "../../../models/responses/login.response";
import {ILoginRequest} from "../../../models/requests/login.request";
import {AuthApiService} from "../../../services/api/auth-api.service";
import {IResponseModel} from "../../../models/commons/response.model";
import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";
import {AccountService} from "../../../services/intercept/account.service";
import {MessageService} from "primeng/api";
import {Constant} from "../../../util/constant";
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
              private router: Router,
              private TokenService: TokenService,
              private accountService: AccountService,
              private messageService: MessageService) {
    this.loginForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      // password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]]
      password: [null, [Validators.required]]
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
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authApiService._login(loginRequest).subscribe(
      (res: IResponseModel<ILoginResponse>) => {
        this.messageService.add({severity:'success', summary:'Thông báo', detail: "Đăng nhập thành công!"})
        // alert('Đăng nhập thành công')
        this.router.navigate(['/pages/chart'])
        this.TokenService.setKey(JSON.stringify(res.data.token))
        this.accountService.getAccountFromApi()
      },
      err => {
        console.log(err)
        this.messageService.add({severity:'error', summary:'Thông báo', detail: "Email hoặc mật khẩu không chính xác!"})
        this.loginForm.reset()
        // window.location.reload()
        returnForm()
      },
    )
  }
}
