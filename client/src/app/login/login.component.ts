import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router, private toastr: ToastrService) {}

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
