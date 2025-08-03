import {Camera, Pencil, Share} from "lucide-react";
import {Button} from "@/presentation/components/ui/button.tsx";
import type {Event} from "@/domain/events/models/Event.ts";
import {formatDate} from "@/core/utils/formatDate.ts";

interface Props {
    hostingEvent: Event
    onClickEdit: (eventName: string) => void
    onClickCamera: (shareId: string) => void
    onClickShare: () => void
}

export function HostingEventItem({hostingEvent, onClickShare, onClickEdit, onClickCamera}: Props) {
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
                <p className="text-primary/60">Ends at {formatDate(new Date(hostingEvent.eventEndDate))}</p>
                <div className="mt-2 flex gap-2">
                    <Button size="sm" onClick={() => onClickCamera(hostingEvent.eventShareId)}>
                        <Camera/>
                    </Button>
                    <Button size="sm" onClick={() => onClickEdit(hostingEvent.eventName)}>
                        <Pencil/>
                    </Button>
                    <Button size="sm" onClick={() => onClickShare()}>
                        <Share/>
                    </Button>
                </div>
            </div>
        </div>
    )
}