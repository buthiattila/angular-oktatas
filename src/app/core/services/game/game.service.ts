import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  isGameRunning: boolean = true;
  rowCount: number = 0;
  colCount: number = 0;
  victoryCount: number = 0;
  wonPlayerIndex: number = 0;
  game: number[][] = [];
  wonMatrix: number[][] = [];
  playerOneSelections: number[] = [];
  playerTwoSelections: number[] = []

  private errorMessage = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessage.asObservable();

  private fieldCount = new BehaviorSubject<number>(0);
  fieldCount$ = this.fieldCount.asObservable();

  private activePlayerIndex = new BehaviorSubject<number>(1);
  activePlayerIndex$ = this.activePlayerIndex.asObservable();

  constructor() {
  }

  newGame(colCount: number, victoryCount: number): void {
    let oldFieldCount: number = this.fieldCount.getValue();

    this.fieldCount.next(colCount * colCount);
    this.colCount = this.rowCount = colCount;
    this.victoryCount = victoryCount;
    this.isGameRunning = true;
    this.playerOneSelections = [];
    this.playerTwoSelections = [];
    this.wonPlayerIndex = 0;
    this.activePlayerIndex.next(1);

    if (this.victoryCount == 0) {
      this.errorMessage.next('A nyeréshez szükséges mezők száma nem lehet 0');
      this.isGameRunning = false;
    } else if (this.victoryCount > this.rowCount) {
      this.errorMessage.next('A nyeréshez szükséges mezők száma nem lehet több, mint a sorok / oszlopok száma');
      this.isGameRunning = false;
    } else {
      this.errorMessage.next('');

      if (oldFieldCount !== this.fieldCount.getValue()) {
        this.prepareWonMatrix();
      }

      this.generatePlayground();
    }
  }

  fieldPressed(i: number, j: number): number {
    let currentPlayerIndex: number = this.activePlayerIndex.getValue();
    let status: number = -1;

    if (this.isGameRunning) {
      status = currentPlayerIndex;

      if (this.game[i][j] === 0) {
        let fieldIndex: number = this.getFieldIndex(i, j);

        this.game[i][j] = currentPlayerIndex;

        if (currentPlayerIndex === 1) {
          this.playerOneSelections.push(fieldIndex);
        } else {
          this.playerTwoSelections.push(fieldIndex);
        }

        if (this.checkIfWon()) {
          this.errorMessage.next('A ' + currentPlayerIndex + ' játékos nyert');
          this.wonPlayerIndex = currentPlayerIndex;
          this.isGameRunning = false;
        } else if (this.checkIfFinished()) {
          this.errorMessage.next('Nincs több lépési lehetőség');
          this.isGameRunning = false;
        } else {
          this.errorMessage.next('');
          this.switchPlayer();
        }
      } else {
        this.errorMessage.next('Nem írhatod felül a már kitöltött mezőt');
        status = -1;
      }
    }

    return status;
  }

  private generatePlayground(): void {
    this.game = [];

    for (let i = 0; i < this.rowCount; i++) {
      this.game.push([]);

      for (let j = 0; j < this.colCount; j++) {
        this.game[i].push(0);
      }
    }
  }

  private getFieldIndex(i: number, j: number): number {
    let index: number = 0;
    let plus: number = i * this.rowCount;

    index = j + plus;

    return index;
  }

  private switchPlayer(): void {
    if (this.activePlayerIndex.getValue() === 1) {
      this.activePlayerIndex.next(2);
    } else {
      this.activePlayerIndex.next(1);
    }
  }

  private checkIfFinished(): boolean {
    return this.game.every(row => !row.includes(0));
  }

  private checkIfWon(): boolean {
    let result: boolean = false;

    if (this.activePlayerIndex.getValue() === 1) {
      result = this.wonMatrix.some(subArray => subArray.every(num => this.playerOneSelections.includes(num)));
    } else {
      result = this.wonMatrix.some(subArray => subArray.every(num => this.playerTwoSelections.includes(num)));
    }

    return result;
  }

  private prepareWonMatrix(): void {
    let wonMatrix: any = [];
    let tempCoord: string[] = [];
    let rowPlus: number = 0;

    for (let i_row: number = 0; i_row < this.rowCount; i_row++) {
      rowPlus = i_row * this.rowCount;

      let colMatrix: [] = [];

      for (let i_col: number = 0; i_col < this.colCount; i_col++) {
        let rowIndex: number = i_col + rowPlus;
        let maxSelectCol: number = i_col + this.victoryCount;
        let rdCoords: number[] = [];
        let ldCoords: number[] = [];

        for (let k_diag: number = 0; k_diag < this.victoryCount; k_diag++) {
          if (maxSelectCol <= this.colCount) {
            let rdIndex: number = rowIndex + (k_diag * (this.colCount + 1));

            if (rdIndex < this.fieldCount.getValue()) {
              rdCoords.push(rdIndex);
            }
          }

          if (i_col >= (this.victoryCount - 1)) {
            let ldIndex: number = rowIndex + (k_diag * (this.colCount - 1));

            if (ldIndex < this.fieldCount.getValue()) {
              ldCoords.push(ldIndex);
            }
          }
        }

        if (rdCoords.length === this.victoryCount) {
          wonMatrix.push(rdCoords);
          tempCoord.push(JSON.stringify(rdCoords));
        }

        if (ldCoords.length === this.victoryCount) {
          wonMatrix.push(ldCoords);
          tempCoord.push(JSON.stringify(ldCoords));
        }

        if (maxSelectCol <= this.colCount) {
          let hCoords: number[] = [];

          for (let k_col: number = i_col; k_col < maxSelectCol; k_col++) {
            hCoords.push(k_col + rowPlus);
          }

          if (!tempCoord.includes(JSON.stringify(hCoords))) {
            wonMatrix.push(hCoords);
            tempCoord.push(JSON.stringify(hCoords));
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

            if (!tempCoord.includes(JSON.stringify(vCoords))) {
              wonMatrix.push(vCoords);
              tempCoord.push(JSON.stringify(vCoords));
            }
          }
        }
      }

      wonMatrix = wonMatrix.concat(colMatrix);
    }

    this.wonMatrix = wonMatrix;
  }

}
