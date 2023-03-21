import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-book-skeleton',
  templateUrl: './detail-book-skeleton.component.html',
  styleUrls: ['./detail-book-skeleton.component.css']
})
export class DetailBookSkeletonComponent implements OnInit {
  responsiveOptions: any;

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
  }

}
