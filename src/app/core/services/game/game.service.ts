import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

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

  private fieldCount = new BehaviorSubject<number>(0);
  fieldCount$ = this.fieldCount.asObservable();

  constructor() {
  }

  generatePlayground(colCount: number, victoryCount: number): void {
    this.victoryCount = victoryCount;
    this.fieldCount.next(colCount * colCount);
    this.colCount = this.rowCount = colCount;
    this.playerOneSelections = [];
    this.playerTwoSelections = [];

    if (this.victoryCount == 0) {
      this.errorMessage.next('A nyeréshez szükséges mezők száma nem lehet 0');
    } else if (this.victoryCount > this.rowCount) {
      this.errorMessage.next('A nyeréshez szükséges mezők száma nem lehet több, mint a sorok / oszlopok száma');
    } else if ((this.rowCount - Math.floor(this.rowCount)) !== 0) {
      this.errorMessage.next('Nem megfelelő a mezőelosztás');
    } else {
      this.prepareWonMatrix();
      this.errorMessage.next('');
      this.game = [];

      for (let i = 0; i < this.rowCount; i++) {
        this.game.push([]);

        for (let j = 0; j < this.colCount; j++) {
          this.game[i].push(0);
        }
      }
    }
  }

  fieldPressed(i: number, j: number): number {
    let status = this.activePlayerIndex;

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
      status = -1;
    }

    return status;
  }

  checkIfFinished(): boolean {
    return this.game.every(row => !row.includes(0));
  }

  checkIfWon(): boolean {
    let result: boolean = false;

    if (this.activePlayerIndex === 1) {
      result = this.wonMatrix.some(subArray => subArray.every(num => this.playerOneSelections.includes(num)));
    } else {
      result = this.wonMatrix.some(subArray => subArray.every(num => this.playerTwoSelections.includes(num)));
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

              if (colIndex > this.fieldCount.getValue()) {
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
