import {type FirebaseStorage, getDownloadURL, ref as storageRef, uploadBytes} from 'firebase/storage';
import {Database, equalTo, get, orderByChild, push, query, ref, remove, set, update} from 'firebase/database';

import {firebaseDatabase, firebaseStorage} from "@/core/config/firebase.ts";
import type {EventDataSource} from "@/data/event/datasource/EventDataSource.ts";
import type {EventDto} from "@/data/event/dto/EventDto.ts";
import type {EventUpdateDto} from "@/data/event/dto/EventUpdateDto.ts";
import type {CreateEventDto} from "@/data/event/dto/CreateEventDto.ts";

export class EventDataSourceImpl implements EventDataSource {
    private readonly db: Database;
    private readonly storage: FirebaseStorage

    constructor(firebaseDb: Database = firebaseDatabase, storage: FirebaseStorage = firebaseStorage) {
        this.db = firebaseDb
        this.storage = storage
    }

    updateEventParticipant(eventId: string, participantId: string, displayName: string): Promise<void> {
        return set(ref(this.db, `events/${eventId}/participants/${participantId}`), displayName)
    }

    async getEventByShareId(eventId: string): Promise<EventDto | null> {
        const event = await get(ref(this.db, `events/${eventId}`))

        if (event.exists()) return event.val()

        return null
    }

    async uploadCoverPhoto(eventId: string, coverPhoto: File) {
        const storagePath = `covers/${eventId}-cover.jpg`
        const storageReference = storageRef(this.storage, storagePath)

        await uploadBytes(storageReference, coverPhoto);

        return await getDownloadURL(storageReference)
    }

    async createEvent(event: CreateEventDto): Promise<string | null> {
        const eventId = await push(ref(this.db, `events`))

        const coverPicture = await this.uploadCoverPhoto(eventId.key || "", event.eventCoverPicture)

        await set(ref(this.db, `events/${eventId.key}`), {
            ...event,
            eventId: eventId.key,
            eventCoverPicture: coverPicture,
            eventShareId: eventId.key
        })

        return eventId.key
    }

    deleteEvent(eventId: string): Promise<void> {
        return remove(ref(this.db, `events/${eventId}`));
    }

    async getEventsByHostId(hostId: string): Promise<Record<string, EventDto>> {
        const eventsQuery = query(ref(this.db, "events"), orderByChild('hostId'), equalTo(hostId));
        const eventsSnapshot = await get(eventsQuery)
        if (eventsSnapshot.exists()) return eventsSnapshot.val()

        return {}
    }

    updateEvent(eventId: string, event: Partial<EventUpdateDto>): Promise<void> {
        return update(ref(this.db, `events/${eventId}`), event)
    }
}