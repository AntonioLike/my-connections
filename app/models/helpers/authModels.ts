export interface AuthCredentials {
    email: string
    password: string
}

export interface AuthResponse {
    token: string
    userId: string
    // optionally:
    // refreshToken?: string
    // expiresIn?: number
}
