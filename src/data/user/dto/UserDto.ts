export interface UserDto {
    userId: string
    email: string
    displayName?: string | null
    photoUrl?: string | null
    emailVerified: boolean
    createdAt: string
    lastLoginAt: string
    hostedEvents: string[]
}