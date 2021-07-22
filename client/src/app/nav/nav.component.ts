import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: User;

  constructor(public accountService: AccountService, private router: Router) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/auth')
  }

  // menuToggle() {
  //   const toggleMenu = document.querySelector('.menu');
  //   toggleMenu.classList.toggle('active');
  //   const toggleProfile = document.querySelector('.profile');
  //   toggleProfile.classList.toggle('active');
  // }

  }

