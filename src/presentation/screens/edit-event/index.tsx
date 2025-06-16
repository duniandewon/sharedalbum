import {AppHeader} from "@/presentation/components/AppHeader.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {CalendarClock, Camera, Dot, Pencil, UsersRound} from "lucide-react";
import {EventEndDateModal} from "@/presentation/screens/edit-event/components/EventEndDateModal.tsx";
import {useEditEvent} from "@/presentation/screens/edit-event/useEditEvent.ts";
import {formatDate} from "@/core/utils/formatDate.ts";
import {formatTime} from "@/core/utils/formatTime.ts";
import {EventNameModal} from "@/presentation/screens/edit-event/components/EventNameModal.tsx";
import {NumberOfPhotosModal} from "@/presentation/screens/edit-event/components/NumberOfPhotosModal.tsx";
import {NumberOfGuestsModal} from "@/presentation/screens/edit-event/components/NumberOfGuestsModal.tsx";


export function EditEvent() {

    const {
        endDateModalOpen,
        eventNameModalOpen,
        numberOfPhotosModalOpen,
        numberOfGuestModalOpen,
        eventName,
        eventEndDate,
        numberOfGuests,
        numberOfPhotos,
        toggleEventNameModalOpen,
        toggleEndDateModalOpen,
        toggleNumberOfPhotosModalOpen,
        toggleNumberOfGuestsModalOpen,
        editEventName,
        selectEventEndDate,
        selectNumberOfPhotos,
        selectNumberOfGuests,
        onGoBack
    } = useEditEvent()

    const Title = () => <div className="flex justify-center items-center gap-2">
        <h2 className="font-black text-xl">
            {eventName}
        </h2>
        <Button onClick={toggleEventNameModalOpen} size="sm" variant="secondary" className="p-0">
            <Pencil size={16}/>
        </Button>
    </div>

    const onClickContinue = () => {
        const event = {eventName, eventEndDate, numberOfGuests, numberOfPhotos}

        console.log("Event:", event)
    }

    return (
        <>
            <div className="grid grid-rows-[auto_1fr] h-screen">
                <AppHeader
                    onClickBack={onGoBack}
                    title={<Title/>}
                />
                <main className="grid grid-rows-2 p-4">
                    <div className="flex justify-center items-center">
                        <Button>
                            <Camera/>
                            Select a cover photo
                        </Button>
                    </div>

                    <div className="space-y-4 grid content-end">
                        <div className="grid grid-cols-[auto_1fr] items-center gap-x-2"
                             onClick={toggleEndDateModalOpen}>
                            <CalendarClock className="row-span-2"/>
                            <p className="text-xs text-secondary-foreground/40">End</p>
                            <div className="flex items-center">
                                <p>{formatDate(eventEndDate)}</p> <Dot/> <p>{formatTime(eventEndDate)}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-[auto_1fr] items-center gap-x-2"
                             onClick={toggleNumberOfGuestsModalOpen}>
                            <UsersRound className="row-span-2"/>
                            <p className="text-xs text-secondary-foreground/40">Number of Guests</p>
                            <p>{numberOfGuests} People</p>
                        </div>

                        <div className="grid grid-cols-[auto_1fr] items-center gap-x-2"
                             onClick={toggleNumberOfPhotosModalOpen}>
                            <Camera className="row-span-2"/>
                            <p className="text-xs text-secondary-foreground/40">Number of photos per guest</p>
                            <p>{numberOfPhotos} Photos</p>
                        </div>
                        <Button className="w-full" onClick={onClickContinue}>
                            CONTINUE
                        </Button>
                    </div>
                </main>
            </div>
            <EventNameModal
                eventName={eventName}
                onEditEventName={editEventName}
                isOpen={eventNameModalOpen}
                onClose={toggleEventNameModalOpen}
            />
            <EventEndDateModal
                isOpen={endDateModalOpen}
                onClose={toggleEndDateModalOpen}
                onSelectDate={selectEventEndDate}
            />
            <NumberOfPhotosModal
                isOpen={numberOfPhotosModalOpen}
                numberOfPhotos={numberOfPhotos}
                onClose={toggleNumberOfPhotosModalOpen}
                onSelectNumberOfPhotos={selectNumberOfPhotos}
            />
            <NumberOfGuestsModal
                isOpen={numberOfGuestModalOpen}
                numberOfGuest={numberOfGuests}
                onClose={toggleNumberOfGuestsModalOpen}
                onSelectNumberOfGuests={selectNumberOfGuests}
            />
        </>
    )
}