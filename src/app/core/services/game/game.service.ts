import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  fieldCount: number = 25;
  rowCount: number = Math.sqrt(this.fieldCount);
  colCount: number = Math.sqrt(this.fieldCount);
  victoryCount: number = 3;
  activePlayerIndex: number = 1;
  game: number[][] = [];

  private errorMessage = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessage.asObservable();

  constructor() {
    if ((this.rowCount - Math.floor(this.rowCount)) !== 0) {
      console.log('Nem megfelelő a mezőelosztás');
    } else {
      this.prepareWonMatrix();
    }
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
    let tempVCord: string[] = [];
    let rowPlus: number = -1;

    for (let i_row: number = 0; i_row < this.rowCount; i_row++) {
      rowPlus = i_row * this.rowCount;

      let colMatrix: [] = [];

      for (let i_col: number = 0; i_col < this.colCount; i_col++) {
        let maxSelectCol: number = i_col + this.victoryCount;
        if (maxSelectCol <= this.colCount) {

          let hCoords: number[] = [];
          for (let k_col: number = i_col; k_col < maxSelectCol; k_col++) {
            let rowIndex: number = k_col + rowPlus;
            hCoords.push(rowIndex);
          }

          if (!tempVCord.includes(JSON.stringify(hCoords))) {
            wonMatrix.push(hCoords);
            tempVCord.push(JSON.stringify(hCoords));
          }
        }

        for (let k_col: number = i_col; k_col < this.colCount; k_col++) {
          let maxSelectRow: number = i_row + this.victoryCount;

          if (maxSelectRow <= this.rowCount) {
            let isEnded: boolean = false;
            let vCoords: number[] = [];

            for (let k_row: number = i_row; k_row < maxSelectRow; k_row++) {
              let colIndex: number = k_col + (k_row * this.colCount);

              vCoords.push(colIndex);

              if (colIndex > this.fieldCount) {
                isEnded = true;
                break;
              }
            }

            if (isEnded) {
              break;
            }

            if (!tempVCord.includes(JSON.stringify(vCoords))) {
              wonMatrix.push(vCoords);
              tempVCord.push(JSON.stringify(vCoords));
            }
          }
        }
      }

      wonMatrix = wonMatrix.concat(colMatrix);
    }

    console.log(wonMatrix);
  }

  checkIfWon(): void {

  }

  switchPlayer(): void {
    if (this.activePlayerIndex === 1) {
      this.activePlayerIndex = 2;
    } else {
      this.activePlayerIndex = 1;
    }
  }

}
