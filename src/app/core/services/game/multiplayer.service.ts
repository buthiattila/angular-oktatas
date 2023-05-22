import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {BehaviorSubject, Observable} from 'rxjs';

import {IMultiplayerService} from './multiplayer.interface';

@Injectable({
  providedIn: 'root'
})
export class MultiplayerService implements IMultiplayerService {

  constructor(private db: AngularFireDatabase) {

    /* this.db.list('item').valueChanges().subscribe((res)=>{
       console.log(res);
      });

      let itemRef = db.object('item');
      itemRef.set({ name: 'new name3!'});

   itemRef.update({ age: "asd546456" });

     itemRef.remove();*/

  }

  createLobby(id: number, game: number[][]): void {
    let lobbyRef = this.db.object(id.toString());
    lobbyRef.set({game: JSON.stringify(game), winner: 0});
  }

  joinLobby(id: number): any {
    return this.db.list(id.toString()).valueChanges();
  }

  updateGameState(id: number, game: number[][]): void {
    let lobbyRef = this.db.object(id.toString());
    lobbyRef.update({game: JSON.stringify(game)});
  }

}
