import {Injectable} from '@angular/core';

/**
 * INFO:
 * A service független, bármikor bármilyen komponens vagy interface használhatja, nem specifikus és nem függ semmitől
 */

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {
  // változó (alap) típusok: string | number | boolean | undefined | null | symbol | bigint
  // visszatérési típusok: void, any, string, number, boolean...

  private valtozo: string = 'valami';
  private readonly valtozo4: any = undefined; // readonly-csak a constructor-ban írható felül
  protected valtozo2: string | number = 20;
  public valtozo3: object = {};

  constructor() {
  }

  /**
   * @param data - bármilyen bemeneti adat lehet (any)
   * Visszaadja, hogy a bemeneti adat számnak megfelelő "number" típusú-e
   */

  isNumber(data: any): boolean {
    return typeof data === 'number';
  }

}
