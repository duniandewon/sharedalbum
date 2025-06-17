import type {EventDataSource} from "@/data/event/datasource/EventDataSource.ts";
import {EventDataSourceImpl} from "@/data/event/datasource/EventDataSourceImpl.ts";

import type {EventRepository} from "@/domain/events/repository/EventRepository.ts";
import type {UpdateEvent} from "@/domain/events/models/UpdateEvent.ts";
import type {Event} from "@/domain/events/models/Event.ts";
import type {CreateEvent} from "@/domain/events/models/CreateEvent.ts";

export class EventsRepositoryImpl implements EventRepository {
    private readonly eventDataSource: EventDataSource

    constructor(eventDataSource: EventDataSource = new EventDataSourceImpl()) {
        this.eventDataSource = eventDataSource
    }

    createEvent(event: CreateEvent): Promise<string | null> {
        return this.eventDataSource.createEvent(event)
    }

    deleteEvent(eventId: string): Promise<void> {
        return this.eventDataSource.deleteEvent(eventId)
    }

    getEventsByHostId(hostId: string): Promise<Event[]> {
        return this.eventDataSource.getEventsByHostId(hostId)
    }

    updateEvent(eventId: string, event: Partial<UpdateEvent>): Promise<void> {
        return this.eventDataSource.updateEvent(eventId, event)
    }
}