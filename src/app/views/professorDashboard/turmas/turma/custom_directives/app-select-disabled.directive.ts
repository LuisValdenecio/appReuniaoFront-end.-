import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAppSelectDisabled]'
})
export class AppSelectDisabledDirective {

  constructor(el : ElementRef) {
    el.nativeElement.style.display = "none";
   }

}
