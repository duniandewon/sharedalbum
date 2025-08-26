import { BookImage, Camera, Pencil, Share } from "lucide-react";
import { Button } from "@/presentation/components/ui/button.tsx";
import { type Event } from "@/domain/events/models/Event.ts";
import { formatDate } from "@/core/utils/formatDate.ts";

interface Props {
  hostingEvent: Event;
  onClickEdit: (eventName: string) => void;
  onClickCamera: () => void;
  onClickShare: () => void;
}

export function HostingEventItem({
  hostingEvent,
  onClickShare,
  onClickEdit,
  onClickCamera,
}: Props) {
  const renderEventDate = () => {
    const now = new Date();
    const start = new Date(hostingEvent.eventDate);
    const end = new Date(hostingEvent.eventEndDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return <>Invalid event date</>;
    }

    if (now < start) {
      return <>Event will start at {formatDate(start)}</>;
    }

    if (now >= end) {
      return <>Event has ended.</>;
    }

    return <>Ends at {formatDate(end)}</>;
  };

  return (
    <div className="flex gap-2">
      <div className="w-14  rounded-md overflow-hidden">
        <img
          src={hostingEvent.eventCoverPicture}
          alt={hostingEvent.eventName}
          className="object-cover h-full w-full"
        />
      </div>
      <div>
        <h2 className="font-semibold">{hostingEvent.eventName}</h2>
        <p className="text-primary/60">{renderEventDate()}</p>
        <div className="mt-2 flex gap-2">
          {hostingEvent.isActive && (
            <Button size="sm" onClick={onClickCamera} aria-label="Open camera">
              <Camera />
            </Button>
          )}
          {!hostingEvent.isActive && (
            <Button size="sm" onClick={onClickCamera} aria-label="View gallery">
              <BookImage />
            </Button>
          )}
          <Button size="sm" onClick={() => onClickEdit(hostingEvent.eventName)}>
            <Pencil />
          </Button>
          <Button size="sm" onClick={() => onClickShare()} aria-label="Share event">
            <Share />
          </Button>
        </div>
      </div>
    </div>
  );
}
