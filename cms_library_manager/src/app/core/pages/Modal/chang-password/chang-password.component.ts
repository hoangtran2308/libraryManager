import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthApiService} from "../../../../services/api/auth-api.service";
import {Constant} from "../../../../util/constant";
import {IChangePasswordRequests} from "../../../../models/requests/change-password.requests";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {TokenService} from "../../../../services/token.service";

@Component({
  selector: 'app-chang-password',
  templateUrl: './chang-password.component.html',
  styleUrls: ['./chang-password.component.css']
})
export class ChangPasswordComponent implements OnInit {
  passwordRegex = Constant.REGEX_PASSWORD_FOR_VALIDATOR
  changPasswordFroms:FormGroup
  noMatch: boolean = true;
  constructor(private fb:FormBuilder,
              private authApiService: AuthApiService,
              private messageService: MessageService,
              private router: Router,
              private tokenService: TokenService,
              ) {
    this.changPasswordFroms = this.fb.group({
      old_password: new FormControl(null, [Validators.required]),
      new_password: new FormControl(null,[Validators.required , Validators.pattern(this.passwordRegex)]),
      re_password: new FormControl(null,[Validators.required])
    })
    this.changPasswordFroms.get('re_password')?.valueChanges.subscribe(
      (changed) => {
        console.log(this.changPasswordFroms.value.new_password)
        console.log(changed)
        this.noMatch = this.changPasswordFroms.value.new_password != changed
        console.log(this.noMatch)
      }
    )
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.changPasswordFroms.invalid || this.noMatch){
      console.log(this.changPasswordFroms, this.noMatch)
       return
    }
    let request: IChangePasswordRequests = this.changPasswordFroms.getRawValue() as IChangePasswordRequests
    this.authApiService._changePassword(request).subscribe(
      (res) => {
        this.changPasswordFroms.reset()
        this.messageService.add({severity:'success', summary:'Thông báo', detail:'Đổi mật khẩu thành công!'})
        alert('Đổi mật khẩu thành công! Bạn sẽ chuyển hướng đến trang đăng nhập')
        this.router.navigateByUrl('/auth/login')
        this.tokenService.clearKey()
      }, error => {
        console.log(error)
        this.messageService.add({severity:'error', summary:'Thông báo', detail: error.error.message})
        this.changPasswordFroms.reset()
      }
    )
  }
}
