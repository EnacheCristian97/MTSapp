import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-photo',
  templateUrl: './member-photo.component.html',
  styleUrls: ['./member-photo.component.css']
})
export class MemberPhotoComponent implements OnInit {
  photo: Photo;
  member: Member;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
  }

}
