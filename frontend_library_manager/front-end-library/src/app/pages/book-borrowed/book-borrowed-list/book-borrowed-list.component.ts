import { Component, OnInit } from '@angular/core';
import {IBookBorrowedView} from "../../../../models/view/book-borrowed.view";
import {BookBorrowedApiService} from "../../../../services/api/book-borrowed-api.service";
import {IPageResponseModel, IResponseModel} from "../../../../models/commons/response.model";
import {IBookBorrowedResponse} from "../../../../models/response/book-borrowed.response";
import {Constant} from "../../../util/constant";


@Component({
  selector: 'app-book-borrowed-list',
  templateUrl: './book-borrowed-list.component.html',
  styleUrls: ['./book-borrowed-list.component.css']
})
export class BookBorrowedListComponent implements OnInit {

  bookBorrowedHistory! : IBookBorrowedView[];
  page: number = Constant.PAGE_INIT;
  size: number = 10
  listPage! : number[];
  totalPage!: number;
  username!: string
  currentAccount: any

  constructor(private bookBorrowedApiService: BookBorrowedApiService,
              ) { }

  ngOnInit(): void {
    this.getAllBorrowedHistory()
    this.onSearch()
  }

  getAllBorrowedHistory() {
    this.bookBorrowedApiService._getAllBorrowedHistory().subscribe(
      (res:IResponseModel<IBookBorrowedResponse[]>) => {
        this.bookBorrowedHistory = [];
        res.data.forEach(borrowedHistoryRes => {
          const getBorrowedHistory: IBookBorrowedView = {
              callCardId: borrowedHistoryRes.call_card_id,
              username: borrowedHistoryRes.username,
              amount: borrowedHistoryRes.amount,
              note: borrowedHistoryRes.note,
              startDate: borrowedHistoryRes.start_date,
              endDate: borrowedHistoryRes.end_date,
              bookId: borrowedHistoryRes.book_id,
              accountId: borrowedHistoryRes.account_id,
              bookName: borrowedHistoryRes.book_name
          };
          this.bookBorrowedHistory.push(getBorrowedHistory)
        })
      }
    )
  }

  onSearch() {
    const searchRequest = {
      page: this.page,
      size: this.size
    }
    console.log()
    this.bookBorrowedApiService._searchBorrowedHistory(searchRequest).subscribe(
      (res: IResponseModel<IPageResponseModel<IBookBorrowedResponse>>) => {
        console.log(res)
          this.listPage = [];
          this.totalPage = Math.floor(res.data.total_elements / this.size) +1
        for (let i = 0; i < this.totalPage; i++) {
          this.listPage.push(i)
        }
        this.bookBorrowedHistory = res.data.results.map(bookBorrowedHistoryRes => {
          console.log(bookBorrowedHistoryRes)
          const bookBorrowedHistoryView : IBookBorrowedView = {
            callCardId: bookBorrowedHistoryRes.call_card_id,
            username: bookBorrowedHistoryRes.username,
            amount: bookBorrowedHistoryRes.amount,
            note: bookBorrowedHistoryRes.note,
            startDate: bookBorrowedHistoryRes.start_date,
            endDate: bookBorrowedHistoryRes.end_date,
            bookId: bookBorrowedHistoryRes.book_id,
            bookName: bookBorrowedHistoryRes.book_name,
            accountId: bookBorrowedHistoryRes.account_id
          };
          console.log(bookBorrowedHistoryRes)
          this.bookBorrowedHistory.push(bookBorrowedHistoryView)
          return bookBorrowedHistoryView

        })
        console.log(this.bookBorrowedHistory)
      }
    )
  }

  onHeader() {
    window.scrollTo(0,450)
  }

  previousPage() {
    this.page--
    this.onSearch()
  }

  onPageChange(item: number) {
    this.page = item
    this.onSearch()
  }

  nextPage() {
    this.page++
    this.onSearch()
  }
}
