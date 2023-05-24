export interface IMultiplayerService {

  setPlayerId(playerId: number): void

  createLobby(id: number, game: number[][], victoryCount: number, maxPlayerCount: number, playerSelections: any): void

  joinLobby(id: number): any

  updateGameState(id: number, game: number[][], playerSelections: any, activePlayerIndex: number, wonPlayerIndex: number): void

  updateJoinedPlayers(id: number, joinedPlayers: number[]): void

}
