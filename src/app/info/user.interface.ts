/**
 * INFO:
 * Meghatározza, hogy egy adott típus milyen paramétereket milyen azonossággal kell kötelezően tartalmaznia
 */

interface User {
  id: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string,
  token: string
}
