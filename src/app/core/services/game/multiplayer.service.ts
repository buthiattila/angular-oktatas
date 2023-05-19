import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class MultiplayerService {

  constructor(private db: AngularFireDatabase) {
  }

  createLobby(id: number, game: number[][]): void {
    let lobbyRef = this.db.object(id.toString());
    lobbyRef.set({game: JSON.stringify(game), winner: 0});
  }

  updateGameState(id: number, game: number[][]): void {
    let lobbyRef = this.db.object(id.toString());
    lobbyRef.update({game: JSON.stringify(game)});
  }

  joinLobby(id: number): any {
    return this.db.list(id.toString()).valueChanges();
  }

}
