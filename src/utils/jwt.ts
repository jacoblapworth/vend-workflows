import jwtDecode from 'jwt-decode'

export type DecodedToken = {
  readonly access_token: string
  readonly expires_in: number
}

export class AuthToken {
  readonly decodedToken: DecodedToken

  constructor(readonly token?: string) {
    // we are going to default to an expired decodedToken
    this.decodedToken = { access_token: '', expires_in: 0 }

    // then try and decode the jwt using jwt-decode
    try {
      if (token) this.decodedToken = jwtDecode(token)
    } catch (e) {}
  }

  get authorizationString() {
    return `Bearer ${this.access_token}`
  }

  get expiresAt(): Date {
    return new Date(this.decodedToken.exp * 1000)
  }

  get isExpired(): boolean {
    return new Date() > this.expiresAt
  }

  get isValid(): boolean {
    return !this.isExpired
  }
}
