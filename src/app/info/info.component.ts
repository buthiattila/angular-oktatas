import {Component} from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  private valtozo: string = 'valami';
  private readonly valtozo4: any = undefined; // readonly-csak a constructor-ban írható felül
  protected valtozo2: string | number = 20;
  public valtozo3: object = {};

  alap_valtozo_tipusok: string | number | boolean | undefined | null | symbol | bigint;
  visszateresi_tipusok: void | any | string | number | boolean;

  array: [string, string, number] = ['valami', 'semmi', 1]; // 3 elemű tömb esetén előre definiálva az elemek típusai

  teszt_parameter: string = 'átadott paraméter1';  // interpoláció
  shouldDisable: boolean = false;
  classByLogic: string = 'ok';
  inputValueOld: string = 'ez a régi érték';
  inputValueNew: string = '';

  buttonClicked(): void {
    this.shouldDisable = !this.shouldDisable;
    this.inputValueNew = 'ez az új érték gombnyomásra';
  }

  inputChange(): void {
    console.log('átírt érték bevitelre');
  }

}
