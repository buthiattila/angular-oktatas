/**
 * INFO:
 * Meghatározza, hogy egy adott típus milyen paramétereket milyen azonossággal kell kötelezően tartalmaznia
 * az első betűt ajánlatos nagy I-vel kezdeni, hogy azonnal látszódjon, hogy interface-ről van szó
 */

export interface IUser {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  token: string
}
