import {useEventsHistory} from "@/presentation/screens/events/useEventsHistory.ts";
import {HostingEventItem} from "@/presentation/screens/events/components/HostingEventItem.tsx";
import {useLocation, useNavigate} from "react-router";

export function EventsHistory() {
    const navigate = useNavigate()
    const location = useLocation()

    const {eventsHosting} = useEventsHistory()
    return (
        <div>
            <h2>Events Hosting</h2>
            <div className="mt-4 space-y-4">
                {eventsHosting.map(event => (
                    <HostingEventItem
                        key={event.eventId}
                        hostingEvent={event}
                        onClickCamera={eventShareId => console.log("eventShareId", eventShareId)}
                        onClickEdit={(eventName) => {
                            navigate("/edit-event", {
                                state: {
                                    from: location,
                                    eventName,
                                    mode: "edit"
                                }
                            })
                        }}
                        onClickShare={() => console.log("Share this event")}
                    />
                ))}
            </div>
        </div>
    )
}