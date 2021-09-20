import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { FollowService } from 'src/app/_services/follow.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member:Member;
  members: Partial<Member[]>;
  predicate = 'following';

  constructor(private memberService : MembersService, private route : ActivatedRoute, private followService : FollowService) { }

  ngOnInit(): void {
    this.loadMember();
    this.loadFollows();
  }
  
  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
    })
  }

  loadFollows(){
    this.followService.getFollows(this.predicate).subscribe(response =>{
      this.members = response;
    })
  }

}
