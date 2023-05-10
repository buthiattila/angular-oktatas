import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  fieldCount: number = 25;
  rowCount: number = 5;
  colCount: number = 5;
  victoryCount: number = 3;
  game: number[][] = [];
  activePlayerIndex: number = 1;

  private errorMessage = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessage.asObservable();

  constructor() {
    this.prepareWonMatrix();
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
      this.checkIfFinished();

      console.log(this.game);
    } else {
      this.errorMessage.next('Nem írhatod felül a másik játékos mezőjét');
      console.log('Tiltott mező felülírás');
    }
  }

  checkIfFinished(): void {
    if (JSON.stringify(this.game).indexOf("0") < 0) {
      this.errorMessage.next('Nincs több lépési lehetőség');
    }
  }

  prepareWonMatrix(): void {
    let wonMatrix: any = [];
    let rowPlus: number = -1;

    for (let i_row: number = 0; i_row < this.rowCount; i_row++) {
      rowPlus = i_row * this.rowCount;
      let colPlus: number = -1;

      let colMatrix: [] = [];

      for (let i_col: number = 0; i_col < this.colCount; i_col++) {
        /**/
         let maxSelectCol: number = i_col + this.victoryCount;
         if (maxSelectCol <= this.colCount) {

          let hCoords: number[] = [];
          for (let k_col: number = i_col; k_col < maxSelectCol; k_col++) {
            hCoords.push(k_col + rowPlus);
          }

          wonMatrix.push(hCoords);
        }
         /**/


        /**
        let maxSelectRow: number = i_row + this.victoryCount;
        if (maxSelectRow <= this.rowCount) {

          let vCoords: number[] = [];
          for (let k_row: number = i_row; k_row < maxSelectRow; k_row++) {
            colPlus = k_row * this.colCount;
            console.log(colPlus);

            vCoords.push(k_row + (i_col + colPlus));
          }

          wonMatrix.push(vCoords);
        }
        /**/


        // 0,5,10; 5,10,15
      }

      wonMatrix = wonMatrix.concat(colMatrix);
    }

    console.log(wonMatrix);
  }

  checkIfWon(): void {


    // for ciklussal menjen végig, hogy milyen koordináta párokon lehet nyerni
    // soronként

  }

  switchPlayer(): void {
    if (this.activePlayerIndex === 1) {
      this.activePlayerIndex = 2;
    } else {
      this.activePlayerIndex = 1;
    }
  }

}
