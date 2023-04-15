import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appStepPrev]'
})
export class StepPrevDirective {

  @Input() mainContainer: string = '';
  @Input() itemContainer: string = '';

  constructor(private element: ElementRef) {
  }

  @HostListener('click') prevFunc(): void {
    if (!this.mainContainer.length) {
      console.warn('Az appStepPrev direktíván a mainContainer megadása kötelező');
    } else if (!this.itemContainer.length) {
      console.warn('Az appStepPrev direktíván az itemContainer megadása kötelező');
    } else {
      let sliderMain = this.element.nativeElement.closest(this.mainContainer);

      if (this.mainContainer !== this.itemContainer) {
        sliderMain = sliderMain.querySelector(this.itemContainer);
      }

      let item = sliderMain.lastChild;

      sliderMain.prepend(item);
    }
  }

}
