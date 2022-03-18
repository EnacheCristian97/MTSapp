import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { FollowService } from 'src/app/_services/follow.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  member:Member;
  messages: Message[] = [];
  user: User;
  isOpen = false;
  hubExist = false;


  constructor(private memberService : MembersService, 
      private route : ActivatedRoute, 
      private messageService: MessageService,
      public presence: PresenceService,
      private accountService: AccountService,
      private el: ElementRef,
      private router: Router) {
        this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
       }


  ngOnInit(): void {
    this.loadMember();
  }
  
  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
    })
  }

  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages =>{
      this.messages = messages;
    })
  }

  onActiveTab(event: Event){
    
    if(this.messages.length === 0 && !this.isOpen && !this.hubExist)
    {
      this.messageService.createHubConnection(this.user, this.member.username);
      this.isOpen = true;
      this.hubExist = true;
    }
    else if(!this.isOpen && this.hubExist){
      this.hubExist = false;
    }
  }

  stopConnection(){
    this.messageService.stopHubConnection();
    this.isOpen = false;
  }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
  }

