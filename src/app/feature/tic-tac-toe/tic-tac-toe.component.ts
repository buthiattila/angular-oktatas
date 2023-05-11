import {Component, OnInit} from '@angular/core';
import {GameService} from 'src/app/core/services/game/game.service';
import {Coords} from 'src/app/core/types/games/coords.type';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  fieldCount:number = 25;
  victoryCount: number = 3;
  lineBreak: number = Math.sqrt(this.fieldCount);
  numbers: number[] = [];
  errorMessage: string = '';

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.numbers = Array(this.fieldCount).fill(1);
    this.gameService.generatePlayground(this.fieldCount,this.victoryCount);
    this.gameService.errorMessage$.subscribe((res) => {
      this.errorMessage = res;
    })
  }

}
