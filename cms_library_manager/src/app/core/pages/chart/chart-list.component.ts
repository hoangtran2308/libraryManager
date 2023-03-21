import {Component, OnInit} from '@angular/core';
import {IChartDataView, IChartView} from "../../../models/views/chart.view,ts";
import {ChartApiService} from "../../../services/api/chart-api.service";
import {IResponseModel} from "../../../models/commons/response.model";
import {IChartRespone} from "../../../models/responses/chart.respone";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css']
})
export class ChartListComponent implements OnInit {

  reportData!: IChartView;

  data: any;
  options: any;
  year!: number;
  selectedChartYear: Date = new Date()
  constructor(private chartApiService: ChartApiService,
              private activatedRoute: ActivatedRoute
  )
  {
    this.options = {
      title: {
        display: true,
        text: 'Biểu đồ tháng thư viện',
        fontSize: 16,

      },
      legend: {
        position: 'bottom'
      }
    };
  }

  ngOnInit(): void {
    this.getAllChartData()
    this.selectedChartYear.setFullYear(2022,5,6)
    this.getChartYear()
  }

  getAllChartData() {
    this.chartApiService._getAllChartData().subscribe(
      (res: IResponseModel<IChartRespone>) => {
        console.log(res)
        this.reportData = {
          publishing: res.data.total_publisher,
          author: res.data.total_author,
          book: res.data.total_book,
          money: res.data.total_money,
          listData: []
        }
        // res.data.list_data.forEach(
        //   item => {
        //     const itemData: listChartView = {
        //       month: item.month,
        //       monthText: item.month_text,
        //       amountBorrow: item.amount_borrow,
        //       amountPay: item.amount_pay
        //     }
        //     this.reportData.listData.push(itemData)
        //   }
        // )
        // this.updateChartData(this.reportData.listData)
      }
    )
  }


  getChartYear(){
    console.log('get')
   this.chartApiService._getChartDataYear(this.selectedChartYear.getFullYear()).subscribe((data )=>
     {
       console.log(data.data)
       let listChartItem : IChartDataView[] = []
       data.data.forEach(
         item => {
           const chartItem: IChartDataView = {
             month: item.month,
             monthText: item.month_text,
             amountBorrow: item.amount_borrow,
             amountPay: item.amount_pay
           }
           listChartItem.push(chartItem)
         }
       )
       this.updateChartData(listChartItem)
     }
   )
  }

  updateChartData(chartItems: IChartDataView[]) {
    console.log(chartItems)
    let listLabel: any[] = []
    let borrowData: any = {
      label: 'Lượt mượn sách',
      data: [],
      backgroundColor: 'red',
      borderColor: 'red'
    }
    let payData: any = {
      label: 'Lượt trả sách',
      data: [],
      backgroundColor: 'green',
      borderColor: 'green',
    }
    chartItems.forEach(
      item => {
        listLabel.push(item.monthText)
        borrowData.data.push(item.amountBorrow)
        payData.data.push(item.amountPay)
      }
    )

    this.data = {
      labels: listLabel,
      datasets: [borrowData,payData]
    }

    console.log(this.data)
  }
}
