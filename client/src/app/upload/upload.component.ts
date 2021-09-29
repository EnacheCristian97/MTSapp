import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @Input() member: Member;
  imageSrc: string;
  uploader: FileUploader;
  titleGroup: FormGroup;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;
  photo: Photo;

  constructor(private accountService: AccountService, public sanitizer:DomSanitizer, 
    private memberService: MembersService, private fb: FormBuilder) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    
    this.initializeUploader();
    // this.initalizeForm();
    this.loadMember();
  }

  loadMember()
  {
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  // initalizeForm(){
  //   this.titleGroup = this.fb.group({
  //     title: ['', Validators.required]
  //   })
  // }

  fileOverBase(event: any) {
    this.hasBaseDropzoneOver = event;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'], 
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 *1024
    });

  
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      let url = (window.URL) ? window.URL.createObjectURL(file._file) : (window as any).webkitURL.createObjectURL(file._file);
      this.imageSrc = url;
    }

    // this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
    //   form.append('title', this.titleGroup.value);
    // }


    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response)
      {
        const photo: Photo =JSON.parse(response);
        this.member.photos.push(photo);
        if(photo.isMain)
        {
          this.user.photoUrl = photo.url;
          this.member.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }
        
      }
      
    }
  }

}
