import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthApiService} from "../../../services/api/auth-api.service";
import {FormBuilder, FormControl, FormGroup, NgModel, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
   email!: string;
   forgetPasswordForms: FormGroup

  constructor(private authApiService: AuthApiService,
              private messageService: MessageService,
              private router: Router,
              private fb:FormBuilder) {
     this.forgetPasswordForms= this.fb.group(
       {
         email: new FormControl(null, [Validators.required, Validators.email]),
       }
     )
  }

  ngOnInit(): void {
  }
   onForgotPassword(){
     if (this.forgetPasswordForms.invalid ){
       return
     }
    this.authApiService._forgetPassword(this.email).subscribe(
      (res)=>{
        this.router.navigateByUrl('/auth/login')
        this.messageService.add({severity:'success', summary:'Thông báo', detail:'Mật khẩu mới đã được gửi tới gmail của bạn!'})
        alert('Mật khẩu mới đã được gửi tới gmail của bạn!')
        console.log(res)
      },error => {
        this.forgetPasswordForms.reset()
        this.messageService.add({severity:'error', summary:'Thông báo', detail:'Kiểm tra lại gmail của bạn'})
        console.log(error)
      }
    )
  }
}
