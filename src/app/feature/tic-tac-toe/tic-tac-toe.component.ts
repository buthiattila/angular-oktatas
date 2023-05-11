import {Component, Input, OnInit} from '@angular/core';
import {GameService} from 'src/app/core/services/game/game.service';
import {Coords} from 'src/app/core/types/games/coords.type';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  victoryCount: number = 3;
  colCount: number = 3;
  numbers: number[] = [];
  errorMessage: string = '';

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.newGame();

    this.gameService.errorMessage$.subscribe((res) => {
      this.errorMessage = res;
    });

    this.gameService.fieldCount$.subscribe((res:number)=>{
      this.numbers = Array(res).fill(1);
      this.colCount = Math.sqrt(res);
    });
  }

  onInputChange() {
    this.newGame();
  }

  newGame(): void {
    this.gameService.generatePlayground(this.colCount, this.victoryCount);
  }

}
