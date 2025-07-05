import type {EventRepository} from "@/domain/events/repository/EventRepository.ts";
import {EventsRepositoryImpl} from "@/data/event/repository/EventsRepositoryImpl.ts";

export class JoinEventUseCase {
    private readonly eventRepository: EventRepository

    constructor(eventRepository: EventRepository = new EventsRepositoryImpl()) {
        this.eventRepository = eventRepository
    }

    async execute(eventId: string, participantId: string, participantName: string) {
        if (!eventId || !participantName) {
            throw new Error("Event ID and display name are required");
        }

        await this.eventRepository.joinEvent(eventId, participantId, participantName)
    }
}