import { Component, OnInit, Renderer2 } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { Photo } from '../_models/photo';
import { PhotoParams } from '../_models/photoParams';
import { UserParams } from '../_models/userParams';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';
import { PhotoService } from '../_services/photos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isOpen = false;
  photos: Photo[];
  pagination: Pagination;
  photoParams: PhotoParams 
  userParams: UserParams;
  photo: Photo;
  members: Member[];

  constructor(private renderer: Renderer2, private photoService: PhotoService,
     private accountService: AccountService, private memberService: MembersService) {  
      this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
        this.userParams = new UserParams(user);
        this.photoParams = new PhotoParams(this.photo);
      })  
  }
  ngOnInit(): void {
    this.loadPost();

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

    loadPost(){
      this.photoService.getPhotos(this.photoParams).subscribe(response => {
        this.photos = response.result;
        this.pagination = response.pagination;
      })
    }
  
    pageChanged(event: any) {
      this.photoParams.pageNumber = event.page;
      this.loadPost();
    }

    
  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe(response =>{
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  onScroll(event: any)
  {
    console.log("Scrolled");
    if(this.pageChanged)
    this.loadPost();
  }

}
