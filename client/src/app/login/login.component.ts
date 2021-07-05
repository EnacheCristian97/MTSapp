import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public accountService: AccountService, 
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {  
 
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  logIn() {
    this.accountService.login(this.model).subscribe(response => 
      {
        this.router.navigateByUrl('/home');
      })
  }



  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

}