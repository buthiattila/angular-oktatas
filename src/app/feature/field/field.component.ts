import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Coords} from 'src/app/core/types/games/coords.type';
import {GameService} from "../../core/services/game/game.service";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Input() lineBreakNeeded: boolean = false;
  @Input() colCount: number = 0;
  @Input() index: number = 0;
  @Input() fieldStatus: number = 0;
  @Input() fieldCoords: Coords = {i: 0, j: 0};
  @Output() coords: EventEmitter<Coords> = new EventEmitter();
  gameId: number = 0;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
  }

  async fieldClicked() {
    const status = await this.gameService.fieldPressed(this.fieldCoords.i, this.fieldCoords.j);

    if (status > 0) {
      this.fieldStatus = status;
    }

    this.coords.emit(this.fieldCoords);
  }

}
