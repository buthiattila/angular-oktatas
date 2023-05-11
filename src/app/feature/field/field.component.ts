import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Coords} from 'src/app/core/types/games/coords.type';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {

  @Input() lineBreakNeeded: boolean = false;
  @Input() lineBreak: number = 0;
  @Input() index: number = 0;
  @Output() coords: EventEmitter<Coords> = new EventEmitter();

  fieldClicked(): void {
    const coords: Coords = {
      i: Math.floor(this.index / this.lineBreak),
      j: this.index % this.lineBreak
    };
    this.coords.emit(coords);

  }

}
