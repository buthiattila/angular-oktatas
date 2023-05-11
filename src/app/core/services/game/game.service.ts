import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  fieldCount: number = 0;
  rowCount: number = 0;
  colCount: number = 0;
  victoryCount: number = 0;
  activePlayerIndex: number = 1;
  game: number[][] = [];
  wonMatrix: number[][] = [];
  playerOneSelections: number[] = [];
  playerTwoSelections: number[] = []

  private errorMessage = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessage.asObservable();

  constructor() {
  }

  generatePlayground(fieldCount: number, victoryCount: number): void {
    this.victoryCount = victoryCount;
    this.fieldCount = fieldCount;
    this.rowCount = Math.sqrt(this.fieldCount);
    this.colCount = Math.sqrt(this.fieldCount);

    if (this.victoryCount == 0) {
      console.log('A nyeréshez szükséges mezők száma nem lehet 0');
    } else if (this.victoryCount > this.rowCount) {
      console.log('A nyeréshez szükséges mezők száma nem lehet több, mint a sorok / oszlopok száma');
    } else if ((this.rowCount - Math.floor(this.rowCount)) !== 0) {
      console.log('Nem megfelelő a mezőelosztás');
    } else {
      this.prepareWonMatrix();

      this.game = [];

      for (let i = 0; i < this.rowCount; i++) {
        this.game.push([]);

        for (let j = 0; j < this.colCount; j++) {
          this.game[i].push(0);
        }
      }
    }
  }

  fieldPressed(i: number, j: number): void {
    if (this.game[i][j] === 0) {
      let fieldIndex: number = this.getFieldIndex(i, j);

      this.game[i][j] = this.activePlayerIndex;

      if (this.activePlayerIndex === 1) {
        this.playerOneSelections.push(fieldIndex);
      } else {
        this.playerTwoSelections.push(fieldIndex);
      }

      if (this.checkIfWon()) {
        this.errorMessage.next('A ' + this.activePlayerIndex + ' játékos nyert');
      } else if (this.checkIfFinished()) {
        this.errorMessage.next('Nincs több lépési lehetőség');
      } else {
        this.errorMessage.next('');
        this.switchPlayer();
      }
    } else {
      this.errorMessage.next('Nem írhatod felül a másik játékos mezőjét');
      console.log('Tiltott mező felülírás');
    }
  }

  checkIfFinished(): boolean {
    return this.game.every(row => !row.includes(0));
  }

  checkIfWon(): boolean {
    let result: boolean = false;

    if (this.activePlayerIndex === 1) {
      result = this.wonMatrix.some(subArray => this.playerOneSelections.some(num => subArray.includes(num)));
    } else {
      result = this.wonMatrix.some(subArray => this.playerTwoSelections.some(num => subArray.includes(num)));
    }

    return result;
  }

  switchPlayer(): void {
    if (this.activePlayerIndex === 1) {
      this.activePlayerIndex = 2;
    } else {
      this.activePlayerIndex = 1;
    }
  }

  private prepareWonMatrix(): void {
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

    this.wonMatrix = wonMatrix;
    console.log(wonMatrix);
  }

  private getFieldIndex(i: number, j: number): number {
    let index: number = 0;
    let plus: number = i * this.rowCount;

    index = j + plus;

    return index;
  }

}
