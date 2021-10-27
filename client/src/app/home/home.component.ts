import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { Photo } from '../_models/photo';
import { PhotoParams } from '../_models/photoParams';
import { UserParams } from '../_models/userParams';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';
import { PhotoService } from '../_services/photos.service';
import _ from 'lodash';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photos : Photo[];
  pagination: Pagination;
  photoParams: PhotoParams 
  userParams: UserParams;
  photo: Photo;
  members: Member[];
  windowScrolled: boolean;

  constructor(private renderer: Renderer2, private photoService: PhotoService,
     private accountService: AccountService, private memberService: MembersService) {  
      this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
        this.userParams = new UserParams(user);
        this.photoParams = new PhotoParams(this.photo);

      })  
  }
  
  ngOnInit(): void {
    this.initialLoadPost();
    this.loadMembers();
  }

 
    initialLoadPost(){
      this.photoService.getPhotos(this.photoParams).subscribe(response => {
        this.photos =response.result;
        this.pagination = response.pagination;
      })
    }

    loadPost(){
      this.photoService.getPhotos(this.photoParams).subscribe(response => {
        this.photos =_.concat(this.photos,response.result);
        this.pagination = response.pagination;
      })
    }
    
  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe(response =>{
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  onScroll()
  {
    console.log("Scrolled");
    this.photoParams.pageNumber++;
    this.loadPost();
 
  }

}
