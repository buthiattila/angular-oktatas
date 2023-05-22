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
  @Output() coords: EventEmitter<Coords> = new EventEmitter();

  fieldStatus: number = 0;
  gameId: number = 0;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.gameId$.subscribe((res: number) => {
      if (this.gameId !== res) {
        this.gameId = res;
        this.fieldStatus = 0;
      }
    });
  }

  async fieldClicked() {
    const coords: Coords = {
      i: Math.floor(this.index / this.colCount),
      j: this.index % this.colCount
    };

    const status = await this.gameService.fieldPressed(coords.i, coords.j);

    if (status > 0) {
      this.fieldStatus = status;
    }

    this.coords.emit(coords);
  }

}
