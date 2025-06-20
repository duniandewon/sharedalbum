import type {EventRepository} from "@/domain/events/repository/EventRepository.ts";
import {EventsRepositoryImpl} from "@/data/event/repository/EventsRepositoryImpl.ts";

export class GetEventByHostIdUseCase {
    private readonly eventRepository: EventRepository

    constructor(eventRepository: EventRepository = new EventsRepositoryImpl()) {
        this.eventRepository = eventRepository
    }

    async execute(hostId: string) {
        return await this.eventRepository.getEventsByHostId(hostId)
    }
}