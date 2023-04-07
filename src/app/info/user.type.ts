export type User = {
  firstName: string,
  lastName: string,
  gender: string,
  username: string,
  name: string,
  email: string,
}

export type Admin = {
  privileges: []
}

export type Super = User & Admin

// INFO: típusokat tudunk meghatározni (milyen mezői és azoknak milyen kötelező típusa lehet),
// valamint a típusokat tudjuk kombinálni (lásd: Super)
