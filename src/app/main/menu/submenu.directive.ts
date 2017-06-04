import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[submenu]'
})
export class SubMenuDirective {

  constructor() { }

  private isOpen = false;

  @HostBinding('class.open')
  get open() {
    return this.isOpen;
  }

  @HostListener('click')
  openMenu() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseleave')
  closeMenu() {
    this.isOpen = false;
  }

}
