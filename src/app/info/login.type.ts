/**
 * INFO:
 * Meghatározza, hogy egy adott típus milyen paramétereket milyen azonossággal tartalmazhat
 */

export type Login = {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  token: string
}
