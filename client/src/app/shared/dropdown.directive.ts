import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostBinding('class.active') isOpen = false;

  @HostListener('event:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = !this.isOpen;
    this.isOpen = this.el.nativeElement.contains(event.target) ? !this.isOpen : false;
    !this.isOpen;

  }

  }
