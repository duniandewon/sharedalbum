import {Database, ref, get, update, query, orderByChild, equalTo, remove, push, set} from 'firebase/database';

import {firebaseDatabase} from "@/core/config/firebase.ts";
import type {EventDataSource} from "@/data/event/datasource/EventDataSource.ts";
import type {EventDto} from "@/data/event/dto/EventDto.ts";
import type {EventUpdateDto} from "@/data/event/dto/EventUpdateDto.ts";
import type {CreateEventDto} from "@/data/event/dto/CreateEventDto.ts";

export class EventDataSourceImpl implements EventDataSource {
    private readonly db: Database;

    constructor(firebaseDb: Database = firebaseDatabase) {
        this.db = firebaseDb
    }

    async createEvent(event: CreateEventDto): Promise<string | null> {
        const eventId = await push(ref(this.db, `events`), event)

        await set(ref(this.db, `events/${eventId.key}`), {
            ...event,
            eventId: eventId.key,
            eventShareId: eventId.key
        })

        return eventId.key
    }

    deleteEvent(eventId: string): Promise<void> {
        return remove(ref(this.db, `events/${eventId}`));
    }

    async getEventsByHostId(hostId: string): Promise<EventDto[]> {
        const eventsQuery = query(ref(this.db, "events"), orderByChild('hostId'), equalTo(hostId));
        const eventsSnapshot = await get(eventsQuery)
        if (eventsSnapshot.exists()) return eventsSnapshot.val()

        return []
    }

    updateEvent(eventId: string, event: Partial<EventUpdateDto>): Promise<void> {
        return update(ref(this.db, `events/${eventId}`), event)
    }
}