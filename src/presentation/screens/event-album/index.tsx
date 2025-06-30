import {useEventAlbum} from "@/presentation/screens/event-album/useEventAlbum.ts";
import {PicturesPerDate} from "@/presentation/screens/event-album/components/PicturesPerDate.tsx";
import {AppHeader} from "@/presentation/components/AppHeader.tsx";
import {Dot} from "lucide-react";

export function EventAlbum() {
    const {eventPictures, totalPictures, onGoBack, eventName, participantsNumber} = useEventAlbum()

    return (
        <div className="h-screen w-screen grid grid-rows-[auto_1fr] gap-2">
            <div className="bg-accent/50 pb-2">
                <AppHeader onClickBack={onGoBack}/>
                <div className="px-4">
                    <h2>{eventName}</h2>
                    <div className="flex text-secondary-foreground/60 text-xs items-center">
                        <p>{totalPictures} Photos</p>
                        <Dot/>
                        <p>{participantsNumber} participants</p>
                    </div>
                </div>
            </div>
            <div className="space-y-4 overflow-y-auto px-4">
                {Object.keys(eventPictures).map(date => (
                    <PicturesPerDate key={date} date={date} pictures={eventPictures[date]}/>
                ))}
            </div>
        </div>
    )
}