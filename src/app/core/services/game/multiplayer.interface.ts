import {Observable} from "rxjs"

export interface IMultiplayerService {
  createLobby(id: number, game: number[][]): void

  joinLobby(id: number): any

  updateGameState(id: number, game: number[][]): void

}
