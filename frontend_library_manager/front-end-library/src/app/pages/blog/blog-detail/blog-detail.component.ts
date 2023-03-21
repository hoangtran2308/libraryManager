import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup } from '@angular/forms';
import {IDataView} from "../../../../models/view/data.view";
import {DataApiService} from "../../../../services/api/data-api.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  dataManager : IDataView[] = []
  dataDetail!: IDataView
  dataInfoForm!: FormGroup
  selectedId!: number


  constructor(private dataApiService: DataApiService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
  ) {
    this.getAllData()
    activatedRoute.paramMap.subscribe(
      (params) => {
        console.log(params.has('tag'))
        console.log(params.get('tag'))
        console.log(params)

      }
    )
    activatedRoute.params.subscribe(
      (params) => {
        console.log(params)
        console.log(params['tag'])
        this.selectedId = params['tag']
        console.log(this.selectedId)

        this.getDataDetail(this.selectedId)
      }
    )
    this.dataInfoForm = fb.group({
        id: [null],
        img: [null],
        title: [null],
        content: [null]
    })

  }

  ngOnInit(): void {
  }

  getAllData() {
    this.dataApiService._getAllData().subscribe(
      (res) => {
        this.dataManager = []
        res.data.forEach(dataRes => {
          const dataView: IDataView = {
            id: dataRes.id,
            img: dataRes.img,
            content: dataRes.content,
            title: dataRes.title
          }
          this.dataManager.push(dataView)
        })
        console.log(this.dataManager)
      }
    )
  }

  getDataDetail(id: number) {
    setTimeout(() => {
      console.log(this.dataManager)
      console.log(id)
      this.dataDetail =this.dataManager.find(item => item.id == id) || <any>null
      console.log(this.dataDetail)
    },500)

  }

}
