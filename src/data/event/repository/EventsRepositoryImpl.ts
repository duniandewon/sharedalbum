import type { EventDataSource } from "@/data/event/datasource/EventDataSource.ts";
import { EventDataSourceImpl } from "@/data/event/datasource/EventDataSourceImpl.ts";

import type { EventRepository } from "@/domain/events/repository/EventRepository.ts";
import type { UpdateEvent } from "@/domain/events/models/UpdateEvent.ts";
import type { Event } from "@/domain/events/models/Event.ts";
import type { CreateEvent } from "@/domain/events/models/CreateEvent.ts";

export class EventsRepositoryImpl implements EventRepository {
  private readonly eventDataSource: EventDataSource;

  constructor(eventDataSource: EventDataSource = new EventDataSourceImpl()) {
    this.eventDataSource = eventDataSource;
  }

  async getEventByShareId(eventShareId: string): Promise<Event | null> {
    const event = await this.eventDataSource.getEventByShareId(eventShareId);

    if (!event) return null;

    const participants: string[] = [];

    for (const participant in event.participants) {
      participants.push(participant);
    }

    return { ...event, participants: participants || [] };
  }

  joinEvent(
    eventId: string,
    participantId: string,
    participantName: string
  ): Promise<void> {
    return this.eventDataSource.updateEventParticipant(
      eventId,
      participantId,
      participantName
    );
  }

  createEvent(event: CreateEvent): Promise<string | null> {
    return this.eventDataSource.createEvent(event);
  }

  deleteEvent(eventId: string): Promise<void> {
    return this.eventDataSource.deleteEvent(eventId);
  }

  async getEventsByHostId(hostId: string): Promise<Event[]> {
    const now = new Date();
    const events = await this.eventDataSource.getEventsByHostId(hostId);
    return Object.values(events).map((event) => ({
      ...event,
      participants: [],
      isActive:
        now >= new Date(event.eventDate) && now <= new Date(event.eventEndDate),
    }));
  }

  updateEvent(eventId: string, event: Partial<UpdateEvent>): Promise<void> {
    return this.eventDataSource.updateEvent(eventId, event);
  }
}
