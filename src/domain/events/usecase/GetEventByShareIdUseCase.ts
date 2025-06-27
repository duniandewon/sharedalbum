import type {EventRepository} from "@/domain/events/repository/EventRepository.ts";
import {EventsRepositoryImpl} from "@/data/event/repository/EventsRepositoryImpl.ts";

export class GetEventByShareIdUseCase {
    private readonly eventRepository: EventRepository

    constructor(eventRepository: EventRepository = new EventsRepositoryImpl()) {
        this.eventRepository = eventRepository
    }

    async execute(eventShareId: string) {
        return await this.eventRepository.getEventByShareId(eventShareId)
    }
}