import { Component, OnInit} from '@angular/core';
// declare function hover(): any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  constructor() {
    // hover()
  }

  ngOnInit(): void {
  }


  onActive() {
    window.scroll(0,0)
  }
}
