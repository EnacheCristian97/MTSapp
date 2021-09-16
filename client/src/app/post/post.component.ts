import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() photo : Photo;
  @Input() user : User;
  @Input() member : Member;

  constructor(private memberService: MembersService) {
   }

  ngOnInit(): void {
  }

}
