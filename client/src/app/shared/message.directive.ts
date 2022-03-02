import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMessage]'
})
export class MessageDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  
  @HostBinding('class.active') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {

    let part = document.querySelector('.message-tab');

        if(this.el.nativeElement.contains(event.target))
        {
          this.isOpen = !this.isOpen
          this.renderer.addClass(part, 'active');
          
        }
        this.isOpen = false;
  } 

  // @HostListener('document:click', ['$event']) toggleClose(event: Event) {
  //   let part = document.querySelector('.message-tab');
  //   if(this.el.nativeElement.contains(event.target) && this.isOpen == true )
  //   {
  //     this.isOpen = true;
  //     this.renderer.removeClass(part, 'active');
  //   } 
  // }


}
