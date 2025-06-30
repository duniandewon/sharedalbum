import {useEventsHistory} from "@/presentation/screens/events/useEventsHistory.ts";
import {HostingEventItem} from "@/presentation/screens/events/components/HostingEventItem.tsx";

export function EventsHistory() {

    const {eventsHosting, navigateToEdit, navigateToEvent} = useEventsHistory()

    return (
        <div className="grid grid-rows-[auto_1fr] w-full">
            <h2>Events Hosting</h2>
            <div className="mt-4 space-y-4 overflow-y-auto">
                {eventsHosting.map(event => (
                    <HostingEventItem
                        key={event.eventId}
                        hostingEvent={event}
                        onClickCamera={navigateToEvent}
                        onClickEdit={navigateToEdit}
                        onClickShare={() => console.log("Share this event")}
                    />
                ))}
            </div>
        </div>
    )
}