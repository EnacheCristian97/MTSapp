import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostBinding('class.active') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {

    let part = document.querySelector('.menu');

        if(this.el.nativeElement.contains(event.target))
        {
          this.isOpen = !this.isOpen
          this.renderer.addClass(part, 'active');
        }
        else
        {
          this.isOpen = false;
          this.renderer.removeClass(part, 'active');
        } 
        
  } 
}