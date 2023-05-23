import {Observable} from "rxjs"

export interface IMultiplayerService {
  createLobby(id: number, game: number[][], victoryCount: number, maxPlayerCount: number, playerSelections: any): void

  joinLobby(id: number): any

  updateGameState(id: number, game: number[][], playerSelections: any, activePlayerIndex: number, wonPlayerIndex: number): void

}
