export interface IChartView {
  publishing: string,
  author: string,
  book: string,
  money: string,
  listData: listChartView[]
}

export interface listChartView {
  month: string,
  monthText: string,
  amountBorrow: string,
  amountPay: string
}



export interface IChartDataView{
  month: string,
  monthText: string,
  amountBorrow: string,
  amountPay: string
}


