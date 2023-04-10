import {Component, SimpleChanges} from '@angular/core';

import {UserService} from "../core/services/user/user.service";

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

  userId: number = 101;
  teszt_parameter: string = 'átadott paraméter1';  // interpoláció
  shouldDisable: boolean = false;
  classByLogic: string = 'ok';
  inputValueOld: string = 'ez a régi érték';
  inputValueNew: string = '';
  currentSlideIndex: number = 0;
  slides:string[] = [
    'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__480.jpg',
    'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832__340.jpg',
    'https://c4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-thumb.jpg',
    'https://images3.alphacoders.com/130/thumbbig-1301279.jpg',
    'https://img.freepik.com/free-photo/galaxy-nature-aesthetic-background-starry-sky-mountain-remixed-media_53876-126761.jpg'
  ];

  constructor(public readonly userService: UserService) {

  }

  buttonClicked(): void {
    this.shouldDisable = !this.shouldDisable;
    this.inputValueNew = 'ez az új érték gombnyomásra';
  }

  inputChange(): void {
    console.log('átírt érték bevitelre');
  }

  getUser(): void {
    //Felhasnáló lekérdezése backend szerverről
    this.userService.getUser(this.userId).then(function (res: any) {
      console.log(res);
    });
  }

  ngOnInit(): void {
    console.log('inicializáláskor fut le');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('változáskor fut le');
  }

  ngGoCheck() {
    console.log('check');
  }

  ngAfterContentInit() {
    console.log('after init');
  }

  ngAfterContentCheck() {
    console.log('after check');
  }

  ngAfterViewInit() {
    console.log('view inicializálás után fut le');
  }

  ngAfterViewChecked() {
    console.log('view ellenőrzés után fut le');
  }

  ngOnDestroy() {
    console.log('komponens törlődésekor fut le (pl elnavigáláskor)');
  }

}
