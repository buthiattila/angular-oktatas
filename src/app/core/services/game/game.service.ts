import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {MultiplayerService} from "./multiplayer.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  isGameRunning: boolean = true;
  rowCount: number = 0;
  colCount: number = 0;
  victoryCount: number = 0;
  playerCount: number = 0;
  wonPlayerIndex: number = 0;
  game: number[][] = [];
  wonMatrix: number[][] = [];
  playerSelections: any = [];

  private gameId = new BehaviorSubject<number>(1);
  gameId$ = this.gameId.asObservable();

  private errorMessage = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessage.asObservable();

  private fieldCount = new BehaviorSubject<number>(0);
  fieldCount$ = this.fieldCount.asObservable();

  private activePlayerIndex = new BehaviorSubject<number>(0);
  activePlayerIndex$ = this.activePlayerIndex.asObservable();

  private gameSubj: BehaviorSubject<number[][]> = new BehaviorSubject([[1]]);
  game$ = this.gameSubj.asObservable();

  constructor(private multiplayer: MultiplayerService) {
  }

  newGame(colCount: number, victoryCount: number, playerCount: number): number {
    let oldFieldCount: number = this.fieldCount.getValue();

    this.fieldCount.next(colCount * colCount);
    this.colCount = this.rowCount = colCount;
    this.victoryCount = victoryCount;
    this.playerCount = playerCount;
    this.isGameRunning = true;
    this.wonPlayerIndex = 0;
    this.activePlayerIndex.next(0);

    if (this.playerCount == 0) {
      this.errorMessage.next('A játékosok száma nem lehet 0');
      this.isGameRunning = false;
    } else if (this.playerCount > this.colCount) {
      this.errorMessage.next('A játékosok száma nem lehet arányaiban nagyobb a pálya méreténél');
      this.isGameRunning = false;
    } else if (this.victoryCount == 0) {
      this.errorMessage.next('A nyeréshez szükséges mezők száma nem lehet 0');
      this.isGameRunning = false;
    } else if (this.victoryCount > this.rowCount) {
      this.errorMessage.next('A nyeréshez szükséges mezők száma nem lehet több, mint a sorok / oszlopok száma');
      this.isGameRunning = false;
    } else {
      this.errorMessage.next('');
      this.gameId.next(Math.floor(Math.random() * 100000000));

      if (oldFieldCount !== this.fieldCount.getValue()) {
        this.prepareWonMatrix();
      }

      this.preparePlayerSelections();
      this.generatePlayground();

      this.multiplayer.createLobby(this.gameId.getValue(), this.game).subscribe((res: any) => {
        this.gameSubj.next(JSON.parse(res[0]));

        this.refreshPlayGround();
      });
    }

    return this.gameId.getValue();
  }

  joinGame(lobbyId: number) { // 24015910
    this.gameId.next(lobbyId);

    this.multiplayer.joinLobby(this.gameId.getValue()).subscribe((res: any) => {
      this.gameSubj.next(JSON.parse(res[0]));

      // TODO: ezeket mind meg kell kapni a db-ből, hogy a felületet fel lehessen építeni
      let colCount:number = 4;
      let victoryCount:number = 4;
      let playerCount:number = 4;
      let isGameRunning:boolean = true;
      let wonPlayerIndex:number = res[1];

      this.fieldCount.next(colCount * colCount);
      this.colCount = this.rowCount = colCount;
      this.victoryCount = victoryCount;
      this.playerCount = playerCount;
      this.isGameRunning = isGameRunning;
      this.wonPlayerIndex = wonPlayerIndex;

      this.prepareWonMatrix();
      this.preparePlayerSelections();
      this.refreshPlayGround();
    });
  }

  async fieldPressed(i: number, j: number): Promise<number> {
    let currentPlayerIndex: number = this.activePlayerIndex.getValue();
    let status: number = -1;

    if (this.isGameRunning) {
      status = currentPlayerIndex;

      if (this.game[i][j] === 0) {
        let fieldIndex: number = this.getFieldIndex(i, j);

        this.game = this.gameSubj.getValue();
        this.game[i][j] = currentPlayerIndex;

        this.gameSubj.next(this.game);
        if (this.gameId) {
          this.multiplayer.updateGameState(this.gameId.getValue(), this.game);
        }

        this.playerSelections[currentPlayerIndex].push(fieldIndex);

        if (this.checkIfWon()) {
          this.errorMessage.next('A ' + currentPlayerIndex + ' játékos nyert');
          this.wonPlayerIndex = currentPlayerIndex;
          this.isGameRunning = false;
        } else if (this.checkIfFinished()) {
          this.errorMessage.next('Nincs több lépési lehetőség');
          this.isGameRunning = false;
        } else {
          this.errorMessage.next('');
        }
      } else {
        this.errorMessage.next('Nem írhatod felül a már kitöltött mezőt');
        status = -1;
      }
    }

    return status;
  }

  getNextPlayer(): number {
    let nextPlayer: number = -1;

    if (this.activePlayerIndex.getValue() === this.playerCount) {
      nextPlayer = 1;
    } else {
      nextPlayer = this.activePlayerIndex.getValue() + 1;
    }

    return nextPlayer;
  }

  private generatePlayground(): void {
    this.game = [];

    for (let i = 0; i < this.rowCount; i++) {
      this.game.push([]);

      for (let j = 0; j < this.colCount; j++) {
        this.game[i].push(0);
      }
    }

    this.gameSubj.next(this.game);
  }

  private refreshPlayGround(): void {
    this.switchPlayer();

    console.log(this.gameSubj.getValue());

  }

  private getFieldIndex(i: number, j: number): number {
    let index: number = 0;
    let plus: number = i * this.rowCount;

    index = j + plus;

    return index;
  }

  private switchPlayer(): void {
    this.activePlayerIndex.next(this.getNextPlayer());
  }

  private checkIfFinished(): boolean {
    return this.game.every(row => !row.includes(0));
  }

  private checkIfWon(): boolean {
    return this.wonMatrix.some(subArray => subArray.every(num => this.playerSelections[this.activePlayerIndex.getValue()].includes(num)));
  }

  private preparePlayerSelections(): void {
    for (let i: number = 0; i < this.playerCount; i++) {
      this.playerSelections[i + 1] = [];
    }
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
