export interface ICollectMoneyRequests {
  account_id: string,
  fined_amount: string,
  id?: number,
  proceeds: string,
  staff_id: string
}
export interface IEditCollectMoneyRequests {
  account_id: string,
  fined_amount: string,
  id: number,
  proceeds: string,
  staff_id: string
}
