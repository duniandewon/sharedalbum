export interface CreateEventDto {
    eventName: string
    eventCoverPicture: File
    eventDate: string
    eventEndDate: string
    hostId: string
    guestLimit: number
    photoLimit: number
}