import type {EventRepository} from "@/domain/events/repository/EventRepository.ts";
import {EventsRepositoryImpl} from "@/data/event/repository/EventsRepositoryImpl.ts";
import type {CreateEvent} from "@/domain/events/models/CreateEvent.ts";

export class CreateEventUseCase {
    private readonly eventRepository: EventRepository

    constructor(eventRepository: EventRepository = new EventsRepositoryImpl()) {
        this.eventRepository = eventRepository
    }

    async execute(event: CreateEvent): Promise<string | null> {
        return await this.eventRepository.createEvent(event)
    }
}