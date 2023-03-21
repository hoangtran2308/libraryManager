import {Component, OnInit, ViewChild} from '@angular/core';
import {PublishCompanyApiService} from "../../../../services/api/publish-company-api.service";
import {IPageResponseModel, IResponseModel} from "../../../../models/commons/response.model";
import {IPublishCompanyResponse} from "../../../../models/responses/publish-company.response";
import {IPublishCompanyView} from "../../../../models/views/publish-company.view";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IEditPublishCompanyRequest, IPublishCompanyRequest} from "../../../../models/requests/publish-company.request";
import {MessageService} from "primeng/api";
import {Constant} from "../../../../util/constant";
import {finalize} from "rxjs";

class ResetForm {
  company_name!: string
  company_email!: string
  company_deputy!: string
}

@Component({
  selector: 'app-publishing-company-list',
  templateUrl: './publishing-company-list.component.html',
  styleUrls: ['./publishing-company-list.component.css']
})
export class PublishingCompanyListComponent implements OnInit {

  publishingCompany : IPublishCompanyView[] = [];
  publishCompanyInfoForm!: FormGroup;
  publishCompanySelected!: IPublishCompanyView;
  agentPeopleSearch!: string;
  emailSearch!: string;
  publishNameSearch!: string;
  page: number = Constant.PAGE_INIT
  size: number = Constant.SIZE_INIT
  resetForm: ResetForm = new ResetForm()
  totalElement: number = 0
  first: number = 0
  loading: boolean = true;
  selectedSortOrder!: string;
  selectedSortField!: string;

  constructor(private publishCompanyApiService: PublishCompanyApiService,
              private fb:FormBuilder,
              private messageService: MessageService) {
    this.publishCompanyInfoForm = fb.group( {
      name: [null],
      address: [null],
      email: [null],
      agent_people: [null],
      date_founding: [null]
    })
  }

  ngOnInit(): void {
    // this.getAllPublishCompany()
    this.onSearch()
  }

  getAllPublishCompany() {
    this.publishCompanyApiService._getAllPublishCompany().subscribe(
      (res: IResponseModel<IPublishCompanyResponse[]>) => {
        this.publishingCompany = [];
        res.data.forEach( publishCompanyRes => {
          const publishCompanyView: IPublishCompanyView = {
            id: publishCompanyRes.company_id,
            name: publishCompanyRes.publish_name,
            address: publishCompanyRes.address,
            email: publishCompanyRes.email,
            agent_people: publishCompanyRes.agent_people,
            date_founding: publishCompanyRes.date_founding
          };
          this.publishingCompany.push(publishCompanyView)
        })

      }
    )
  }

  onAddNewPublishCompany() {
    const createNewPublishCompanyRequest: IPublishCompanyRequest = {
      publish_name: this.publishCompanyInfoForm.value.name,
      address: this.publishCompanyInfoForm.value.address,
      email: this.publishCompanyInfoForm.value.email,
      agent_people: this.publishCompanyInfoForm.value.agent_people,
      date_founding: this.publishCompanyInfoForm.value.date_founding
    };
    this.publishCompanyApiService._createNewPublishCompany(createNewPublishCompanyRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo!', detail:'Thêm nhà xuất bản thành công! '});
        console.log('Them nha xuat ban thanh cong');
        this.onReset()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo!', detail:'Thêm nhà xuất bản thất bại!'});
        console.log('Them nha xuat ban that bai')
      }
    )
  }

  onDeletePublishCompany() {
    if(this.publishCompanySelected) {
      this.publishCompanyApiService._deletePublishCompany(this.publishCompanySelected.id).subscribe(
        (res: IResponseModel<any>) => {
          this.messageService.add({severity:'success', summary:'Thông báo!', detail:'Xóa thành công! '});
          console.log('');
          this.onSearch()
        },
        err => {
          this.messageService.add({severity:'error', summary:'Thông báo!', detail:'Xóa thất bại! '});
          console.log('')
        }
      )
    }
  }

  editPublishCompany(i: IPublishCompanyView) {
    this.publishCompanySelected = i;
    this.publishCompanyInfoForm.patchValue(
      {
        name: i.name,
        address: i.address,
        email: i.email,
        agent_people: i.agent_people,
        date_founding: i.date_founding
      }
    )
  }

  onEditPublishCompany() {
    const editPublishCompanyRequest: IEditPublishCompanyRequest = {
      publish_name: this.publishCompanyInfoForm.value.name,
      address: this.publishCompanyInfoForm.value.address,
      email: this.publishCompanyInfoForm.value.email,
      agent_people: this.publishCompanyInfoForm.value.agent_people,
      date_founding: this.publishCompanyInfoForm.value.date_founding,
      id: this.publishCompanySelected.id
    };
    this.publishCompanyApiService._editPublishCompany(editPublishCompanyRequest).subscribe(
      (res: IResponseModel<any>) => {
        this.messageService.add({severity:'success', summary:'Thông báo!', detail:'Cập nhật thành công!'});
        console.log('Cập nhật thành công');
        this.onSearch()
      },
      err => {
        this.messageService.add({severity:'error', summary:'Thông báo!', detail:'Cập nhật thất bại!'});
        console.log('Cập nhật thất bại')
      }
    )
  }

  selectPublishCompany(i: IPublishCompanyView) {
    this.publishCompanySelected = i;
    console.log(this.publishCompanySelected)
  }

  onSearch() {
    const searchRequest = {
      publishName: this.publishNameSearch,
      email: this.emailSearch,
      agentPeople: this.agentPeopleSearch,
      page: this.page,
      size: this.size,
      sortField: this.selectedSortField,
      sortOrder: this.selectedSortField ? this.selectedSortOrder : undefined
    }
    this.publishCompanyApiService._searchPublishCompany(searchRequest)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
      (res: IResponseModel<IPageResponseModel<IPublishCompanyResponse>>) => {
        this.totalElement = res.data.total_elements
        this.publishingCompany = [];
        res.data.results.forEach( publishCompanyRes => {
          const publishCompanyView: IPublishCompanyView = {
            id: publishCompanyRes.company_id,
            name: publishCompanyRes.publish_name,
            address: publishCompanyRes.address,
            email: publishCompanyRes.email,
            agent_people: publishCompanyRes.agent_people,
            date_founding: publishCompanyRes.date_founding
          };
          this.publishingCompany.push(publishCompanyView)
        })
          console.log(this.publishingCompany)
      }
    )
  }

//  onClear
  onClear(){
      this.resetForm.company_name = '',
        this.resetForm.company_email = '',
        this.resetForm.company_deputy = ''

  }
  onReset() {
    this.publishNameSearch = Constant.NULL_VALUE
    this.page = Constant.PAGE_INIT
    this.size = Constant.SIZE_INIT
    this.emailSearch = Constant.NULL_VALUE
    this.agentPeopleSearch = Constant.NULL_VALUE
    this.first = 0
    this.selectedSortOrder = Constant.NULL_VALUE
    this.selectedSortField = Constant.NULL_VALUE
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
}
