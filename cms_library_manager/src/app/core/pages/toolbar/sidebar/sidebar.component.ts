import {Component, OnInit} from '@angular/core';
import {Constant} from "../../../../util/constant";
import {AccountService} from "../../../../services/intercept/account.service";
import {Router} from "@angular/router";

declare function clickMenuMobile(): any
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menu = Constant.MENU
  accountRole!: string
  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.getRoleOfAccount()
  }

  getRoleOfAccount() {
    this.accountService.getCurrentAccount().subscribe(
      res => {
        if(res) {
          if(res.code_role == "A001") this.accountRole = 'admin'
          else if(res.code_role == "S001") this.accountRole = 'staff'
          else this.router.navigateByUrl('auth/login')
        }
      }
    )
  }

  onClickMenu() {
    clickMenuMobile()
  }
}
