import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/_models/photo';
import { PhotoService } from 'src/app/_services/photos.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  photo: Photo;

  constructor(private photoService : PhotoService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadPhoto();
  }

  loadPhoto()
  {
    this.photoService.getPhoto(this.route.snapshot.paramMap.get('title')).subscribe(photo => {
      this.photo = photo;
    })
  }

  close(){
    this.router.navigateByUrl('/home');
  }

}
