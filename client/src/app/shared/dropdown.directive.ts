import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostBinding('class.active') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    let part = document.querySelector('.menu');
    if (this.isOpen) this.renderer.addClass(part, 'active');
    else this.renderer.removeClass(part, 'active');
  }

}
