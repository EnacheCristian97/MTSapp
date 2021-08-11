import { Component, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
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
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if(this.editForm.dirty)
    {
      $event.returnValue = true;
    }
  }

  constructor(private accoutService: AccountService,
              private memberService: MembersService, 
              private toastr: ToastrService,
              private renderer: Renderer2) 
  { 
    this.accoutService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember()
  {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile was succsessfully updeted');
      this.editForm.reset(this.member);
    } )

  }

  onOpen() {
    let part = document.querySelector('.open');
    if(!this.isOpen)
    {
      this.isOpen = true;
      this.renderer.addClass(part,'active');
    }
    else
    {
        this.isOpen = false;
        this.renderer.removeClass(part,'active');
    }
    }

  }



