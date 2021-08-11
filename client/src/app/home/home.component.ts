import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isOpen = false;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
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

}
