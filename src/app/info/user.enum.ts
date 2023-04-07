/**
 * INFO:
 * Ha importáljuk az adott komponensbe, akkor az userStatus.registered-el
 * globálisan azonos kulcs-érték párosokat tudunk felhasználni, így változás esetén elegendő csak itt átírni
 * lásd: login.component
 */

export enum UserStatus {
  registered = 'reg',
}

export enum UserTestData {
  username = "kminchelle",
  password = "0lelplR",
  isCompany = 0
}
