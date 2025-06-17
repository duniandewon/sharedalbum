import type {Event} from "@/domain/events/models/Event.ts";
import type {UpdateEvent} from "@/domain/events/models/UpdateEvent.ts";
import type {CreateEvent} from "@/domain/events/models/CreateEvent.ts";

export interface EventRepository {
    createEvent(event: CreateEvent): Promise<string | null>

    updateEvent(eventId: string, event: Partial<UpdateEvent>): Promise<void>

    getEventsByHostId(hostId: string): Promise<Event[]>

    deleteEvent(eventId: string): Promise<void>
}