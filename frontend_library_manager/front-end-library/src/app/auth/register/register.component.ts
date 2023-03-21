import { Component, OnInit } from '@angular/core';
import {Constant} from "../../util/constant";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IRegisterView} from "../../../models/view/register.view";
import {MessageService} from "primeng/api";
import {RegisterApiService} from "../../../services/api/register-api.service";
import {IResponseModel} from "../../../models/commons/response.model";
import {IRegisterRequest} from "../../../models/requests/register.request";
import {IRegisterResponse} from "../../../models/response/register.response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  passwordRegex = Constant.REGEX_PASSWORD_FOR_VALIDATOR;
  phoneRegex = Constant.REGEX_PHONE_FOR_VALIDATOR;
  registerFroms:FormGroup;
  noMatch: boolean = true;
  showEye: boolean=false
  showEye1 : boolean=false
  registerInfoForm!: FormGroup;
  registerManager: IRegisterView[]=[];
  myForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private registerApiService : RegisterApiService,
              private messageService: MessageService,
              private router : Router
              ) {
    this.registerFroms = this.fb.group({
      full_name : new FormControl(null, [Validators.required]),
      date_of_birth : new FormControl(null, [Validators.required]),
      phone : new FormControl(null, [Validators.required,Validators.pattern(this.phoneRegex)]),
      username : new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordRegex)]),
      re_password: new FormControl(null, Validators.required)
    })
    this.registerFroms.get('re_password')?.valueChanges.subscribe(
      (retype)=> {
        this.noMatch = this.registerFroms.value.password != retype
        console .log(this.noMatch)
      }
    )

    // this.registerInfoForm = fb.group({
    //   username: [null],
    //   password: [null],
    //   full_name: [null],
    //   date_of_birth: [null],
    //   email: [null],
    //   phone: [null],
    //   role_id: [null],
    //   account_id: [null],
    //   creat_date: [null],
    //   code_role: [null]
    // })
  }

  ngOnInit(): void {
    this.getAllAccountManager()
  }
 onRegister(){
    if (this.registerFroms.invalid || this.noMatch){
      console.log(this.registerFroms, this.noMatch)
      return
    }
 }

  getAllAccountManager() {
    this.registerApiService._getAllAccountManager().subscribe(
      (res: IResponseModel<IRegisterResponse[]>) => {
        this.registerManager = [];
        res.data.forEach(registerRes => {
          const registerManagerView: IRegisterView = {
            account_id: registerRes.account_id,
            username: registerRes.username,
            password: registerRes.password,
            full_name: registerRes.full_name,
            date_of_birth: registerRes.date_of_birth,
            email: registerRes.email,
            phone: registerRes.phone,
            code_role: registerRes.code_role,
            role_id: registerRes.role_id,
            creat_date: registerRes.creat_date
          };
          this.registerManager.push(registerManagerView)

        })
      }
    )
  }

  onAddNewAccount() {
    const createNewAccountRequest: IRegisterRequest = {
      username: this.registerFroms.value.username,
      password: this.registerFroms.value.password,
      full_name: this.registerFroms.value.full_name,
      dob: this.registerFroms.value.date_of_birth,
      email: this.registerFroms.value.email,
      phone:  '0' + this.registerFroms.value.phone,

    };
    this.registerApiService._createNewAccount(createNewAccountRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity: 'success', summary: 'Thông báo!', detail: 'Tạo tài khoản thành công! '});
        console.log('Tao tai khoan thanh cong');
        this.router.navigateByUrl('/auth/login')
        alert('Đăng ký thành công! Bạn sẽ chuyển hướng đến trang đăng nhập')
        this.getAllAccountManager()
      },
      err => {
        console.log(err)
        this.messageService.add({severity: 'error', summary: 'Thông báo!', detail: 'Tạo tài khoản thất bại'});
        console.log('Tao tai khoan that bai')
      }
    )
  }
}
