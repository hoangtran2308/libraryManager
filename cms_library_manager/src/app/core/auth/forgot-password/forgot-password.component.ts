import { Component, OnInit } from '@angular/core';
import {AuthApiService} from "../../../services/api/auth-api.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    forgotPasswordForm: FormGroup
  email!: string

  constructor(private authApiService: AuthApiService,
              private messageService: MessageService,
              private router: Router,
              private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group(
      {
        email: new FormControl(null, [Validators.required, Validators.email])
      }
    )
  }

  ngOnInit(): void {
  }

  onForgotPassword() {
      if (this.forgotPasswordForm.invalid){
        return
      }
    this.authApiService._forgotPassword(this.email).subscribe(
      (res ) => {
        this.messageService.add({severity:'success', summary:'Thông báo', detail: "Đổi mật khẩu thành công!"})
        alert('Mật khẩu mới được gửi đến gmail của bạn')
        this.router.navigateByUrl('/auth/login')
        console.log(res)
      }, error => {
        this.forgotPasswordForm.reset()
        this.messageService.add({severity:'error', summary:'Thông báo', detail: error.error.message})
        console.log(error)
      }
    )
  }

}
