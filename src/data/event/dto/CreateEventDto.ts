export interface CreateEventDto {
    eventName: string
    eventCoverPicture: string
    eventDate: string
    eventEndDate: string
    hostId: string
    guestLimit: number
    photoLimit: number
}