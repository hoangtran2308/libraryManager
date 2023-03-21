import { Component, OnInit } from '@angular/core';
import {RoleManagerApiService} from "../../../../services/api/role-manager-api.service";
import {IResponseModel} from "../../../../models/commons/response.model";
import {IRoleManagerResponse} from "../../../../models/responses/role-manager.response";
import {IRoleManagerView} from "../../../../models/views/role-manager.view";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IEditRoleRequest, IRoleManagerRequest} from "../../../../models/requests/role-manager.request";
import {MessageService} from "primeng/api";
import {Constant} from "../../../../util/constant";
import {finalize} from "rxjs";

@Component({
  selector: 'app-role-manager-list',
  templateUrl: './role-manager-list.component.html',
  styleUrls: ['./role-manager-list.component.css']
})
export class RoleManagerListComponent implements OnInit {

  roleManager: IRoleManagerView[] = [];
  roleManagerInfoForm!: FormGroup;
  roleManagerSelected!: IRoleManagerView;
  size: number = Constant.SIZE_INIT;
  loading: boolean = true;


  constructor(private roleManagerApiService: RoleManagerApiService,
              private fb: FormBuilder,
              private messageService: MessageService) {
    this.roleManagerInfoForm = fb.group( {
      code: [null],
      name: [null]
    })
  }

  ngOnInit(): void {
    this.getAllRoleManager()
  }

  getAllRoleManager() {
    this.roleManagerApiService._getAllRoleManager()
      .pipe(finalize(() => this.loading = false))
      .subscribe(
      (res: IResponseModel<IRoleManagerResponse[]>) => {
        this.roleManager = [];
        res.data.forEach(roleManagerRes => {
          const roleManagerView: IRoleManagerView = {
            id: roleManagerRes.roleId,
            code: roleManagerRes.codeRole,
            name: roleManagerRes.name
          };
          this.roleManager.push(roleManagerView)
        } )
      }
    )
  }

  onAddNewRole() {
    const createNewRoleRequest: IRoleManagerRequest = {
      codeRole: this.roleManagerInfoForm.value.code,
      name: this.roleManagerInfoForm.value.name
    };
    this.roleManagerApiService._createNewRole(createNewRoleRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo!', detail:'Thêm nhóm quyền thành công! '});
        console.log('Thanh cong');
        this.getAllRoleManager()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo!', detail:'Thêm nhóm quyền thất bại! '});
        console.log('That bai')
      }
    )
  }

  onDeleteRole() {
    if(this.roleManagerSelected) {
      this.roleManagerApiService._deleteRole(this.roleManagerSelected.id).subscribe(
        (res: IResponseModel<any>) => {
          this.messageService.add({severity:'success', summary:'Thông báo!', detail:'Xóa thành công! '});
          this.getAllRoleManager();
          console.log('Success');
        },
        err => {
          this.messageService.add({severity:'error', summary:'Thông báo!', detail:'Xóa thất bại! '});
          console.log('Failed')
        }
      )
    }
  }

  editRole(i: IRoleManagerView) {
    this.roleManagerSelected = i;
    this.roleManagerInfoForm.patchValue(
      {
        code: i.code,
        name: i.name
      }
    )
  }

  onEditRole() {
    const editRoleRequest: IEditRoleRequest = {
      codeRole: this.roleManagerInfoForm.value.code,
      name: this.roleManagerInfoForm.value.name,
      role_id: this.roleManagerSelected.id
    };
    this.roleManagerApiService._editRole(editRoleRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo!', detail:'Cập nhật thành công!'});
        console.log('Success');
        this.getAllRoleManager()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo!', detail:'Cập nhật thất bại!'});
        console.log('Failed')
      }
    )
  }

  selectRole(i: IRoleManagerView) {
    this.roleManagerSelected = i
  }

}
