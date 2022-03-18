import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/_models/photo';
import { PhotoService } from 'src/app/_services/photos.service';
import { Location } from '@angular/common';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  photo: Photo;
  member: Member;
  user: User;
  comment = new Comment;
  @ViewChild('commentForm') commentForm: NgForm;

  constructor(private photoService : PhotoService, private route : ActivatedRoute, private router: Router,
    private location: Location, private memberService: MembersService,private accoutService: AccountService) 
    {
      this.accoutService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    }

  ngOnInit(): void {
    this.loadMember();
    this.loadPhoto();
  }

  loadPhoto()
  {
    this.photoService.getPhoto(this.route.snapshot.paramMap.get('publicId')).subscribe(photo => {
      this.photo = photo;
    })
  }

  loadMember()
  {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  addComment(){
    this.photoService.addComment(this.comment);
    this.commentForm.reset();
  }

  close(){
    this.router.navigateByUrl('/home');
  }

  back(): void{
    this.location.back();
  }

}
