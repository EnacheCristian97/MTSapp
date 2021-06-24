import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
   

  }

  logout() {
    this.accountService.logout();
  }

  


  }

