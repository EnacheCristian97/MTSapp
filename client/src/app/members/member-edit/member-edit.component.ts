import { Component, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { UploadComponent } from 'src/app/upload/upload.component';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { FollowService } from 'src/app/_services/follow.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  isOpen = false;
  members: Partial<Member[]>;
  predicate = 'following';
  predicate1 = 'followers'
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if(this.editForm.dirty)
    {
      $event.returnValue = true;
    }
  }

  constructor(private accoutService: AccountService,
              private memberService: MembersService, 
              private toastr: ToastrService,
              private renderer: Renderer2,
              private followService : FollowService) 
  { 
    this.accoutService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
    this.loadFollowing();
  }

  loadMember()
  {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  loadFollowing(){
    this.followService.getFollows(this.predicate).subscribe(response =>{
      this.members = response;
    })
  }

  loadFollowers(){
    this.followService.getFollows(this.predicate1).subscribe(response =>{
      this.members = response;
    })
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile was succsessfully updeted');
      this.editForm.reset(this.member);
    } )

  }

  }



