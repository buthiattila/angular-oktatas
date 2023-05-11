import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Coords} from 'src/app/core/types/games/coords.type';

import {GameService} from "../../core/services/game/game.service";

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

  fieldStatus: number = 0;

  constructor(private gameService: GameService) {
  }

  fieldClicked(): void {
    const coords: Coords = {
      i: Math.floor(this.index / this.lineBreak),
      j: this.index % this.lineBreak
    };
    const status = this.gameService.fieldPressed(coords.i, coords.j);

    if (status > 0) {
      this.fieldStatus = status;
    }
    this.coords.emit(coords);

  }

}
