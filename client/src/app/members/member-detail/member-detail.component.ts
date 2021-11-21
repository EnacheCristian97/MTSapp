import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { FollowService } from 'src/app/_services/follow.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member:Member;
  messages: Message[] = [];


  constructor(private memberService : MembersService, private route : ActivatedRoute, private messageService: MessageService) { }

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

  onActiveTab(data: Message){
    if(this.messages.length === 0)
    this.loadMessages();
  }



}
