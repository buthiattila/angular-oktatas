import {Component, OnInit} from '@angular/core';

import {GameService} from 'src/app/core/services/game/game.service';
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {
  minColCount: number = 3;
  maxColCount: number = 5;
  colCount: number = 4;
  victoryCount: number = 3;
  playerCount: number = 2;
  numbers: number[] = [];
  errorMessage: string = '';
  activePlayerIndex: number = 0;
  lobbyId: number = 0;
  game: number[][] = [];
  private unsubscribe = new Subject<void>();

  constructor(private gameService: GameService) {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.gameService.game$.subscribe(res => {
      this.game = res;
    });

    this.gameService.errorMessage$.pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.errorMessage = res;
    });

    this.gameService.fieldCount$.pipe(takeUntil(this.unsubscribe)).subscribe((res: number) => {
      this.numbers = Array(res).fill(1);
      this.colCount = Math.sqrt(res);
    });

    this.gameService.activePlayerIndex$.pipe(takeUntil(this.unsubscribe)).subscribe((res: number) => {
      this.activePlayerIndex = res;
    });
  }

  newGame(): void {
    this.lobbyId = this.gameService.newGame(this.colCount, this.victoryCount, this.playerCount);
  }

  joinToLobby(): void {
    this.gameService.joinLobby(this.lobbyId);
  }

}
