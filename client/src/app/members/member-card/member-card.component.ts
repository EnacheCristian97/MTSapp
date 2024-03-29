import { Component, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { FollowService } from 'src/app/_services/follow.service';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;

  constructor(private followService: FollowService,
     private toastr : ToastrService, 
     private renderer : Renderer2, 
     public presence :PresenceService,) { }

  ngOnInit(): void {
  }

  addFollow(member: Member)
  {
    this.followService.addFollow(member.username).subscribe(() => {
      this.toastr.success('You have follow ' + member.knownAs);

    })
  }


}
