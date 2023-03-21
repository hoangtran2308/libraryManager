import { Component, OnInit } from '@angular/core';
import {IStaffManagerView} from "../../../../models/views/staff-manager.view";
import {StaffManagerApiService} from "../../../../services/api/staff-manager-api.service";
import {IPageResponseModel, IResponseModel} from "../../../../models/commons/response.model";
import {IStaffManagerResponse} from "../../../../models/responses/staff-manager.response";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MessageService} from "primeng/api";
import {IEditStaffRequest, IStaffManagerRequest} from "../../../../models/requests/staff-manager.request";
import {Constant} from "../../../../util/constant";
import {finalize} from "rxjs";

@Component({
  selector: 'app-staff-manager-list',
  templateUrl: './staff-manager-list.component.html',
  styleUrls: ['./staff-manager-list.component.css']
})
export class StaffManagerListComponent implements OnInit {

  staffManager: IStaffManagerView[] = [];
  staffManagerInfoForm!: FormGroup;
  staffManagerSelected!: IStaffManagerView;
  fullNameSearch!: string;
  phoneSearch!: string;
  addressSearch!: string;
  page: number = Constant.PAGE_INIT
  size: number = Constant.SIZE_INIT
  totalElement: number = 0
  first: number = 0
  loading: boolean = true;
  selectedSortField!: string
  selectedSortOrder!: string
  //Auto Complete Search
  fullNameComplete!: string[];

  constructor(private staffManagerApiService: StaffManagerApiService,
              private fb: FormBuilder,
              private messageService: MessageService) {
    this.staffManagerInfoForm = fb.group({
      name: [null],
      phoneNum: [null],
      address: [null],
      dateOfBirth: [null]
    })
  }

  ngOnInit(): void {
    this.onSearch()
  }

  getAllStaffManager() {
    this.staffManagerApiService._getAllStaffManager().subscribe(
      (res: IResponseModel<IStaffManagerResponse[]>) => {
        this.staffManager = [];
        res.data.forEach(staffManagerRes => {
          const staffManagerView: IStaffManagerView = {
            id: staffManagerRes.staff_id,
            name: staffManagerRes.name_staff,
            phoneNum: staffManagerRes.phone_number,
            address: staffManagerRes.address,
            dateOfBirth: staffManagerRes.date_of_birth
          };
          this.staffManager.push(staffManagerView)
        })
      }
    )
  }

  onAddNewStaff() {
    const createNewStaffRequest: IStaffManagerRequest = {
      id: this.staffManagerInfoForm.value.id,
      name_staff: this.staffManagerInfoForm.value.name,
      phone_number: this.staffManagerInfoForm.value.phoneNum,
      address: this.staffManagerInfoForm.value.address,
      date_of_birth: this.staffManagerInfoForm.value.dateOfBirth
    };
    this.staffManagerApiService._createNewStaff(createNewStaffRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity: 'success', summary: 'Thông báo!', detail: 'Thêm thành công! '});
        console.log('Thanh cong');
       this.onReset()
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Thông báo!', detail: 'Thêm thất bại! '});
        console.log('That bai');
      }
    )
  }

  onDeleteStaff() {
    if (this.staffManagerSelected) {
      this.staffManagerApiService._deleteStaff(this.staffManagerSelected.id).subscribe(
        (res: IResponseModel<any>) => {
          this.messageService.add({severity: 'success', summary: 'Thông báo', detail: 'Xóa thành công'});
          console.log('Xoa thanh cong');
          this.onSearch()
        },
        err => {
          this.messageService.add({severity: 'error', summary: 'Thông báo', detail: 'Xóa thất bại'});
          console.log('Xoa that bai');
        }
      )
    }
  }

  onEditStaff() {
    const editStaffRequest: IEditStaffRequest = {
      id: this.staffManagerSelected.id,
      address: this.staffManagerInfoForm.value.address,
      date_of_birth: this.staffManagerInfoForm.value.dateOfBirth,
      name_staff: this.staffManagerInfoForm.value.name,
      phone_number: this.staffManagerInfoForm.value.phoneNum,
    };
    this.staffManagerApiService._editStaff(editStaffRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity: 'success', summary: 'Thông báo!', detail: 'Cập nhật thành công!'});
        console.log('Success');
        this.onSearch()
      },
      err => {
        this.messageService.add({severity: 'error', summary: 'Thông báo!', detail: 'Cập nhật thất bại!'});
        console.log('Failed');
      }
    )
  }


  editStaff(i: IStaffManagerView) {
    this.staffManagerSelected = i;
    this.staffManagerInfoForm.patchValue(
      {
        name: i.name,
        phoneNum: i.phoneNum,
        address: i.address,
        dateOfBirth: i.dateOfBirth
      }
    )
  }

  selectStaff(i: IStaffManagerView) {
    this.staffManagerSelected = i
  }

  onSearch() {
    const searchRequest = {
      nameStaff: this.fullNameSearch,
      phoneNumber: this.phoneSearch,
      address: this.addressSearch,
      page: this.page,
      size: this.size,
      sortField: this.selectedSortField,
      sortOrder: this.selectedSortField ? this.selectedSortOrder : undefined
    }
    console.log(searchRequest)
    this.staffManagerApiService._searchStaff(searchRequest)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
      (res: IResponseModel<IPageResponseModel<IStaffManagerResponse>>) => {
        this.totalElement = res.data.total_elements
        this.staffManager = [];
        res.data.results.forEach(staffManagerRes => {
          const staffManagerView: IStaffManagerView = {
            id: staffManagerRes.staff_id,
            name: staffManagerRes.name_staff,
            phoneNum: staffManagerRes.phone_number,
            address: staffManagerRes.address,
            dateOfBirth: staffManagerRes.date_of_birth
          };
          this.staffManager.push(staffManagerView)
        })
        console.log(this.staffManager)
      }
    )
  }
  onReset() {
    this.fullNameSearch = Constant.NULL_VALUE
    this.page = Constant.PAGE_INIT
    this.size = Constant.SIZE_INIT
    this.phoneSearch = Constant.NULL_VALUE
    this.addressSearch = Constant.NULL_VALUE
    this.selectedSortField= Constant.NULL_VALUE
    this.selectedSortOrder=Constant.NULL_VALUE
    this.first = 0
    this.onSearch()
  }

  pageChange($event: any) {
    // @ts-ignore
    this.page = $event.first/$event.rows
    // @ts-ignore
    this.size = $event.rows
    // @ts-ignore
    this.selectedSortField = $event.sortField
    this.selectedSortOrder = $event.sortOrder == 1? 'ACS' : 'DESC'
    console.log($event)
    this.onSearch()
  }

  searchFullNameComplete(keyword: string): string[] {
    let fullName: string[] = [];
    for (let i = 0; i < this.staffManager.length; i++) {
      if (this.staffManager[i].name.includes(keyword)) {
        fullName.push(this.staffManager[i].name)
      }
    }
    return fullName
  }

  onSearchFullName(event: any) {
    this.fullNameComplete = this.searchFullNameComplete(event.query)
    this.onSearch()
  }
}
