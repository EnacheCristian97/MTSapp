import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../_models/photo';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() photo : Photo;

  constructor() { }

  ngOnInit(): void {
  }

}
