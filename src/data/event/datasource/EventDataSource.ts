import type {EventDto} from "@/data/event/dto/EventDto.ts";
import type {EventUpdateDto} from "@/data/event/dto/EventUpdateDto.ts";
import type {CreateEventDto} from "@/data/event/dto/CreateEventDto.ts";

export interface EventDataSource {
    getEventsByHostId(hostId: string): Promise<EventDto[]>

    createEvent(event: CreateEventDto): Promise<string | null>

    updateEvent(eventId: string, event: Partial<EventUpdateDto>): Promise<void>

    deleteEvent(eventId: string): Promise<void>
}