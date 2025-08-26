export interface AuthCredentials {
    email: string
    password: string
}

export interface AuthResponse {
    accessToken: string
    userId: string
    refreshToken?: string
    expiresIn?: number
}
