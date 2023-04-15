import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appStepNext]'
})
export class StepNextDirective {

  @Input() mainContainer: string = '';
  @Input() itemContainer: string = '';

  constructor(private element: ElementRef) {
  }

  @HostListener('click') nextFunc(): void {
    if (!this.mainContainer.length) {
      console.warn('Az appStepNext direktíván a mainContainer megadása kötelező');
    } else if (!this.itemContainer.length) {
      console.warn('Az appStepNext direktíván az itemContainer megadása kötelező');
    } else {
      let sliderMain = this.element.nativeElement.closest(this.mainContainer);

      if (this.mainContainer !== this.itemContainer) {
        sliderMain = sliderMain.querySelector(this.itemContainer);
      }

      let item = sliderMain.firstChild;

      sliderMain.append(item);
    }
  }

}
