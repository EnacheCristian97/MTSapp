import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { MessageService } from '../_services/message.service';

@Directive({
  selector: '[appClose]'
})
export class CloseDirective {

  constructor(private el: ElementRef, private renderer: Renderer2,private messageService: MessageService) { }
  
  @HostBinding('class.active') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {

    let part = document.querySelector('.message-tab');

        if(this.el.nativeElement.contains(event.target))
        {
         this.isOpen = false;
         this.renderer.removeClass(part, 'active');
        }
  } 

}
