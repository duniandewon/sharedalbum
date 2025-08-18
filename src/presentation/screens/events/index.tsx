import { useState } from "react";

import QRCode from "react-qr-code";

import { useEventsHistory } from "@/presentation/screens/events/useEventsHistory.ts";
import { HostingEventItem } from "@/presentation/screens/events/components/HostingEventItem.tsx";
import { Sheet } from "@/presentation/components/ui/sheet";

import { EventLink } from "./components/event-link";
import { Button } from "@/presentation/components/ui/button";
import { useQrCodeDownload } from "./useQrcodeDownload";

export function EventsHistory() {
  const { eventsHosting, navigateToEdit, navigateToEvent } = useEventsHistory();

  const [open, setOpen] = useState(false);
  const [curEventLink, setCurEventLink] = useState("");

  const svgId = "event-qr-svg";

  const { downloadPng } = useQrCodeDownload(svgId, {
    filename: "event-qr",
    size: 256,
    scale: 4,
    backgroundColor: "#ffffff",
  });

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] w-full">
        <h2>Events Hosting</h2>
        <div className="mt-4 space-y-4 overflow-y-auto">
          {eventsHosting.map((event) => (
            <HostingEventItem
              key={event.eventId}
              hostingEvent={event}
              onClickCamera={navigateToEvent}
              onClickEdit={navigateToEdit}
              onClickShare={() => {
                setOpen((prev) => !prev);
                const eventLink = `${window.location.origin}/event/${event.eventId}`;
                setCurEventLink(eventLink);
              }}
            />
          ))}
        </div>
      </div>
      <Sheet open={open} onClose={() => setOpen(false)}>
        <EventLink eventLink={curEventLink} />
        <div className="p-8">
          <QRCode
            id={svgId}
            size={256}
            level="Q"
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={curEventLink}
            viewBox={`0 0 256 256`}
          />
        </div>
        <Button onClick={downloadPng}>Download QR Code</Button>
      </Sheet>
    </>
  );
}
