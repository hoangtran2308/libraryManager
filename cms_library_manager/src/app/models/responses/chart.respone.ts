export interface IChartRespone {
  total_publisher: string,
  total_author: string,
  total_book: string,
  total_money: string,
  list_data: listChartRespone[]
}

export interface listChartRespone {
  month: string,
  month_text: string,
  amount_borrow: string,
  amount_pay: string
}
export interface IChartYearRespone{
  month: string,
  month_text: string,
  amount_borrow: string,
  amount_pay: string
}
