import {Component, OnInit} from '@angular/core';

import {GameService} from 'src/app/core/services/game/game.service';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  victoryCount: number = 3;
  colCount: number = 5;
  numbers: number[] = [];
  errorMessage: string = '';
  activePlayerIndex: number = 0;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.newGame();

    this.gameService.errorMessage$.subscribe((res) => {
      this.errorMessage = res;
    });

    this.gameService.fieldCount$.subscribe((res: number) => {
      this.numbers = Array(res).fill(1);
      this.colCount = Math.sqrt(res);
    });

    this.gameService.activePlayerIndex$.subscribe((res: number) => {
      this.activePlayerIndex = res;
    });
  }

  onInputChange() {
    this.newGame();
  }

  newGame(): void {
    this.gameService.newGame(this.colCount, this.victoryCount);
  }

}
