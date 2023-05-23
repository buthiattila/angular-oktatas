import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";

import {IMultiplayerService} from './multiplayer.interface';

@Injectable({
  providedIn: 'root'
})
export class MultiplayerService implements IMultiplayerService {

  playerId: number = 0;

  constructor(private db: AngularFireDatabase) {

    /* this.db.list('item').valueChanges().subscribe((res)=>{
       console.log(res);
      });

      let itemRef = db.object('item');
      itemRef.set({ name: 'new name3!'});

   itemRef.update({ age: "asd546456" });

     itemRef.remove();*/

  }

  setPlayerId(playerId: number): void {
    this.playerId = playerId;
  }

  createLobby(id: number, game: number[][], victoryCount: number, maxPlayerCount: number, playerSelections: any): any {
    let joinedPlayers: number[] = [0, this.playerId];

    let lobbyRef = this.db.object(id.toString());
    lobbyRef.set({
      game: {
        gameMatrix: JSON.stringify(game),
        activePlayerIndex: 1,
        wonPlayerIndex: 0,
        victoryCount: victoryCount,
        maxPlayerCount: maxPlayerCount,
        playerSelections: JSON.stringify(playerSelections),
        joinedPlayers: joinedPlayers,
      }
    });

    return this.joinLobby(id);
  }

  joinLobby(id: number): any {
    return this.db.list(id.toString()).valueChanges();
  }

  updateGameState(id: number, game: number[][], playerSelections: any, activePlayerIndex: number, wonPlayerIndex: number): void {
    let lobbyRef = this.db.object(id.toString() + '/game');
    lobbyRef.update({
      gameMatrix: JSON.stringify(game),
      playerSelections: JSON.stringify(playerSelections),
      activePlayerIndex: activePlayerIndex,
      wonPlayerIndex: wonPlayerIndex
    });
  }

  updateJoinedPlayers(id: number, joinedPlayers: number[]): void {
    joinedPlayers.push(this.playerId);

    let lobbyRef = this.db.object(id.toString() + '/game');
    lobbyRef.update({
      joinedPlayers: joinedPlayers
    });
  }

}
