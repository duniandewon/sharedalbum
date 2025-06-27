export interface Event {
    eventId: string
    eventName: string
    eventDescription: string
    eventCoverPicture: string
    eventDate: string
    eventEndDate: string
    eventShareId: string
    hostId: string
    guestLimit: number
    photoLimit: number
    createdAt: string
    isActive: boolean,
    participants: string[]
}