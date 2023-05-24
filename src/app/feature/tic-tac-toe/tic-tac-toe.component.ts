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
  defaultColCount: number = 3;
  planColCount: number = 0;
  colCount: number = 0;
  victoryCount: number = 3;
  maxPlayerCount: number = 2;
  joinedPlayercount: number = 0;
  numbers: number[] = [];
  errorMessage: string = '';
  activePlayerIndex: number = 0;
  lobbyId: number = 0;
  lobbyType: string = '';
  gameMatrix: number[][] = [];
  private unsubscribe = new Subject<void>();

  constructor(private gameService: GameService) {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.gameService.gameMatrix$.subscribe(res => {
      this.gameMatrix = res;
    });

    this.gameService.joinedPlayerCount$.pipe(takeUntil(this.unsubscribe)).subscribe((res) => {
      this.joinedPlayercount = res;
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
    this.colCount = (this.planColCount === 0 ? this.defaultColCount : this.planColCount);
    this.lobbyId = this.gameService.newGame(this.colCount, this.victoryCount, this.maxPlayerCount);
    this.lobbyType = 'Szervező';
  }

  joinGame(): void {
    this.gameService.joinGame(this.lobbyId);
    this.lobbyType = 'Vendég';
  }

}
