import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {MultiplayerService} from "./multiplayer.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  newJoining: boolean = false;
  playEnable: boolean = true;
  rowCount: number = 0;
  colCount: number = 0;
  victoryCount: number = 0;
  maxPlayerCount: number = 0;
  wonPlayerIndex: number = 0;
  wonMatrix: number[][] = [];
  playerSelections: any = [];
  joinedPlayers: any = [];
  playerId: number = Math.floor(Math.random() * 100000000);

  private gameId = new BehaviorSubject<number>(1);
  gameId$ = this.gameId.asObservable();

  private errorMessage = new BehaviorSubject<string>('');
  errorMessage$ = this.errorMessage.asObservable();

  private fieldCount = new BehaviorSubject<number>(0);
  fieldCount$ = this.fieldCount.asObservable();

  private joinedPlayerCount = new BehaviorSubject<number>(0);
  joinedPlayerCount$ = this.joinedPlayerCount.asObservable();

  private activePlayerIndex = new BehaviorSubject<number>(0);
  activePlayerIndex$ = this.activePlayerIndex.asObservable();

  private gameMatrix: BehaviorSubject<number[][]> = new BehaviorSubject([[1]]);
  gameMatrix$ = this.gameMatrix.asObservable();

  constructor(private multiplayer: MultiplayerService) {
    this.multiplayer.setPlayerId(this.playerId);
  }

  newGame(colCount: number, victoryCount: number, maxPlayerCount: number): number {
    let oldFieldCount: number = this.fieldCount.getValue();

    this.fieldCount.next(colCount * colCount);
    this.colCount = this.rowCount = colCount;
    this.victoryCount = victoryCount;
    this.maxPlayerCount = maxPlayerCount;
    this.wonPlayerIndex = 0;
    this.activePlayerIndex.next(0);
    this.playEnable = this.preCheckGeneration();

    if (this.playEnable) {
      this.errorMessage.next('');
      this.gameId.next(Math.floor(Math.random() * 100000000));

      if (oldFieldCount !== this.fieldCount.getValue()) {
        this.prepareWonMatrix();
      }

      this.preparePlayerSelections();
      this.switchPlayer();

      this.multiplayer.createLobby(this.gameId.getValue(), this.generateGameMatrix(), this.victoryCount, this.maxPlayerCount, this.playerSelections).subscribe((res: any) => {
        this.gameMatrix.next(JSON.parse(res[0].gameMatrix));
        this.playerSelections = JSON.parse(res[0].playerSelections);
        this.wonPlayerIndex = res[0].wonPlayerIndex;
        this.activePlayerIndex.next(res[0].activePlayerIndex);
        this.joinedPlayers = res[0].joinedPlayers;
        this.joinedPlayerCount.next(Object.keys(res[0].joinedPlayers).length - 1);
        this.playEnable = this.checkGameStatus();
      });
    }

    return this.gameId.getValue();
  }

  joinGame(lobbyId: number) {
    if (!lobbyId) {
      this.errorMessage.next('A csatlakozáshoz adja meg a szoba azonosítóját');
    } else {
      if (this.gameId.getValue() !== lobbyId) {
        this.newJoining = true;
      }

      this.gameId.next(lobbyId);

      this.multiplayer.joinLobby(this.gameId.getValue()).subscribe((res: any) => {
        if (!Object.keys(res).length) {
          this.errorMessage.next('A csatlakozáshoz megadott szoba azonosító érvénytelen');
        } else {
          this.gameMatrix.next(JSON.parse(res[0].gameMatrix));
          this.playerSelections = JSON.parse(res[0].playerSelections);
          this.wonPlayerIndex = res[0].wonPlayerIndex;
          this.activePlayerIndex.next(res[0].activePlayerIndex);
          this.joinedPlayers = res[0].joinedPlayers;
          this.playEnable = this.checkGameStatus();

          if (this.newJoining) {
            this.multiplayer.updateJoinedPlayers(this.gameId.getValue(), this.joinedPlayers);
            let oldFieldCount: number = this.fieldCount.getValue();

            this.colCount = this.rowCount = this.gameMatrix.getValue().length;
            this.fieldCount.next(this.colCount * this.colCount);
            this.victoryCount = res[0].victoryCount;
            this.maxPlayerCount = res[0].maxPlayerCount;

            if (oldFieldCount !== this.fieldCount.getValue()) {
              this.prepareWonMatrix();
            }

            this.newJoining = false;
          }

          this.joinedPlayerCount.next(Object.keys(res[0].joinedPlayers).length - 1);
        }
      });
    }
  }

  async fieldPressed(i: number, j: number): Promise<number> {
    let status: number = -1;

    if (this.playEnable) {
      if (this.joinedPlayers[this.activePlayerIndex.getValue()] === this.playerId) {
        status = this.activePlayerIndex.getValue();

        let gameMatrix: number[][] = this.gameMatrix.getValue();

        if (gameMatrix[i][j] === 0) {
          let fieldIndex: number = this.getFieldIndex(i, j);
          this.playerSelections[this.activePlayerIndex.getValue()].push(fieldIndex);

          gameMatrix[i][j] = this.activePlayerIndex.getValue();

          this.gameMatrix.next(gameMatrix);
          this.playEnable = this.checkGameStatus();

          if (this.playEnable) {
            this.switchPlayer();
          }

          this.multiplayer.updateGameState(this.gameId.getValue(), gameMatrix, this.playerSelections, this.activePlayerIndex.getValue(), this.wonPlayerIndex);
        } else {
          this.errorMessage.next('Nem írhatod felül a már kitöltött mezőt');
          status = -1;
        }
      } else {
        this.errorMessage.next('Nem te következel');
      }
    }

    return status;
  }

  private checkGameStatus(): boolean {
    let result: boolean = true;

    if (this.checkIfWon()) {
      this.wonPlayerIndex = this.activePlayerIndex.getValue();
      this.errorMessage.next('A ' + this.wonPlayerIndex + ' játékos nyert');
      result = false;
    } else if (this.checkIfFinished()) {
      this.errorMessage.next('Nincs több lépési lehetőség');
      result = false;
    } else {
      this.errorMessage.next('');
    }

    return result;
  }

  private preCheckGeneration(): boolean {
    let result: boolean = true;

    if (this.maxPlayerCount == 0) {
      this.errorMessage.next('A játékosok száma nem lehet 0');
      result = false;
    } else if (this.maxPlayerCount > this.colCount) {
      this.errorMessage.next('A játékosok száma nem lehet arányaiban nagyobb a pálya méreténél');
      result = false;
    } else if (this.victoryCount == 0) {
      this.errorMessage.next('A nyeréshez szükséges mezők száma nem lehet 0');
      result = false;
    } else if (this.victoryCount > this.rowCount) {
      this.errorMessage.next('A nyeréshez szükséges mezők száma nem lehet több, mint a sorok / oszlopok száma');
      result = false;
    }

    return result;
  }

  private generateGameMatrix(): number[][] {
    let gameMatrix: number[][] = [];

    for (let i = 0; i < this.rowCount; i++) {
      gameMatrix.push([]);

      for (let j = 0; j < this.colCount; j++) {
        gameMatrix[i].push(0);
      }
    }

    return gameMatrix;
  }

  private getFieldIndex(i: number, j: number): number {
    let index: number = 0;
    let plus: number = i * this.rowCount;

    index = j + plus;

    return index;
  }

  private getNextPlayer(): number {
    let nextPlayer: number = -1;

    if (this.activePlayerIndex.getValue() === this.maxPlayerCount) {
      nextPlayer = 1;
    } else {
      nextPlayer = this.activePlayerIndex.getValue() + 1;
    }

    return nextPlayer;
  }

  private switchPlayer(): void {
    this.activePlayerIndex.next(this.getNextPlayer());
  }

  private checkIfFinished(): boolean {
    return this.gameMatrix.getValue().every(row => !row.includes(0));
  }

  private checkIfWon(): boolean {
    return this.wonMatrix.some(subArray => subArray.every(num => this.playerSelections[this.activePlayerIndex.getValue()].includes(num)));
  }

  private preparePlayerSelections(): void {

    for (let i: number = 0; i <= this.maxPlayerCount; i++) {
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
