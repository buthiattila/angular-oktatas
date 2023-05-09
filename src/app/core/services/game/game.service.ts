import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  fieldCount: number = 9;
  rowCount: number = 3;
  colCount: number = 3;
  game: number[][] = [];
  activePlayerIndex: number = 1;

  private errorMessage = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessage.asObservable();

  constructor() {
  }

  generatePlayground(): void {
    this.game = [];

    for (let i = 0; i < this.rowCount; i++) {
      this.game.push([]);

      for (let j = 0; j < this.colCount; j++) {
        this.game[i].push(0);
      }
    }
  }

  fieldPressed(i: number, j: number): void {
    if (this.game[i][j] === 0) {
      this.game[i][j] = this.activePlayerIndex;
      this.switchPlayer();
      this.errorMessage.next('');

      console.log(this.game);
    } else {
      this.errorMessage.next('Nem írhatod felül a másik játékos mezőjét');
      console.log('Nem írhatod felül a másik játékos mezőjét');
    }
  }

  switchPlayer() {
    if (this.activePlayerIndex === 1) {
      this.activePlayerIndex = 2;
    } else {
      this.activePlayerIndex = 1;
    }
  }

}
