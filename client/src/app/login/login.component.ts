import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {}
  registerMode = false;

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {  
 
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  logIn() {
    this.accountService.login(this.model).subscribe(response => 
      {
        console.log(response);
      }, error => {
        console.log(error);
      })
  }



  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}
