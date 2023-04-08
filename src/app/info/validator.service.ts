import {Injectable} from '@angular/core';

import {IValidator} from './validator.interface';

/**
 * INFO:
 * A service független, bármikor bármilyen komponens vagy interface használhatja, nem specifikus és nem függ semmitől
 */

@Injectable({
  providedIn: 'root'
})
export class ValidatorService implements IValidator {

  constructor() {

  }

  test() {
    // EZT a funkciót kötelezően kell tartalmaznia, mert az imlementált interface tartalmazza
    // KÉRDÉS: ha az interface-n van paraméter, itt miért nem adhatok meg? az interface csak paraméterazonosságokat tartalmazhat?
  }

  /**
   * @param data - bármilyen bemeneti adat lehet (any)
   * Visszaadja, hogy a bemeneti adat számnak megfelelő "number" típusú-e
   */

  isNumber(data: any): boolean {
    return typeof data === 'number';
  }

}
