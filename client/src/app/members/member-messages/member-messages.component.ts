import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() username: string;
  @Input() messages: Message[];
  messageContent: string;
 


  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    // this.loadMessages();
  }

  sendMessage()
  {
    this.messageService.sendMessage(this.username, this.messageContent).then(() =>{
      this.messageForm.reset();
    })
  }

  }


  // loadMessages(){
  //   this.messageService.getMessageThread(this.username).subscribe(messages =>{
  //     this.messages =messages;
  //   })
  // }




