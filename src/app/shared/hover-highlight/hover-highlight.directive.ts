import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]'
})
export class HoverHighlightDirective {

  @Input() bgColorDefault: string = 'transparent';
  @Input() bgColorHover: string = 'yellow';

  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = this.bgColorDefault;
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.element.nativeElement.style.backgroundColor = this.bgColorHover;
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.element.nativeElement.style.backgroundColor = this.bgColorDefault;
  }

}
