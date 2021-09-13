import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../_models/photo';
import { User } from '../_models/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() photo : Photo;
  @Input() user : User;

  constructor() { }

  ngOnInit(): void {
  }

}
