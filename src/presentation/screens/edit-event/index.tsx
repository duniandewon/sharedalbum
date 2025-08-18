import { CalendarClock, Camera, Dot, Pencil, UsersRound } from "lucide-react";

import { formatDate } from "@/core/utils/formatDate.ts";
import { formatTime } from "@/core/utils/formatTime.ts";

import { Button } from "@/presentation/components/ui/button.tsx";
import { AppHeader } from "@/presentation/components/AppHeader.tsx";
import { EventEndDateModal } from "@/presentation/screens/edit-event/components/EventEndDateModal.tsx";
import { EventNameModal } from "@/presentation/screens/edit-event/components/EventNameModal.tsx";
import { NumberOfPhotosModal } from "@/presentation/screens/edit-event/components/NumberOfPhotosModal.tsx";
import { NumberOfGuestsModal } from "@/presentation/screens/edit-event/components/NumberOfGuestsModal.tsx";
import { useEventForm } from "@/presentation/screens/edit-event/useEventForm.ts";
import { CoverPhoto } from "@/presentation/screens/edit-event/components/CoverPhoto.tsx";
import { EventStartDateModal } from "./components/EventStartDateModal";

export function EditEvent() {
  const {
    eventName,
    eventStartDate,
    eventEndDate,
    numberOfGuests,
    numberOfPhotos,
    eventCoverPhoto,
    modals,
    isSubmitting,
    onSubmitEvent,
    toggleModal,
    setField,
    onGoBack,
  } = useEventForm();

  const Title = () => (
    <div className="flex justify-center items-center gap-2">
      <h2 className="font-black text-xl">{eventName}</h2>
      <Button
        onClick={() => toggleModal("eventName")}
        size="sm"
        variant="secondary"
        className="p-0"
      >
        <Pencil size={16} />
      </Button>
    </div>
  );

  const onClickContinue = async () => {
    await onSubmitEvent();
  };

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] h-dvh">
        <AppHeader onClickBack={onGoBack} title={<Title />} />
        <main className="flex flex-col p-4 gap-4">
          <CoverPhoto
            onSelectCoverPhoto={(file) => setField("eventCoverPhoto", file)}
          />

          <div className="space-y-4 grid content-end">
          <div
              className="grid grid-cols-[auto_1fr] items-center gap-x-2"
              onClick={() => toggleModal("startDate")}
            >
              <CalendarClock className="row-span-2" />
              <p className="text-xs text-secondary-foreground/40">Event starts at:</p>
              <div className="flex items-center">
                <p>{formatDate(eventStartDate)}</p> <Dot />{" "}
                <p>{formatTime(eventStartDate)}</p>
              </div>
            </div>

            <div
              className="grid grid-cols-[auto_1fr] items-center gap-x-2"
              onClick={() => toggleModal("endDate")}
            >
              <CalendarClock className="row-span-2" />
              <p className="text-xs text-secondary-foreground/40">Event ends at:</p>
              <div className="flex items-center">
                <p>{formatDate(eventEndDate)}</p> <Dot />{" "}
                <p>{formatTime(eventEndDate)}</p>
              </div>
            </div>

            <div
              className="grid grid-cols-[auto_1fr] items-center gap-x-2"
              onClick={() => toggleModal("numberOfGuests")}
            >
              <UsersRound className="row-span-2" />
              <p className="text-xs text-secondary-foreground/40">
                Number of Guests:
              </p>
              <p>{numberOfGuests} People</p>
            </div>

            <div
              className="grid grid-cols-[auto_1fr] items-center gap-x-2"
              onClick={() => toggleModal("numberOfPhotos")}
            >
              <Camera className="row-span-2" />
              <p className="text-xs text-secondary-foreground/40">
                Number of photos per guest:
              </p>
              <p>{numberOfPhotos} Photos</p>
            </div>
            <Button
              className="w-full"
              onClick={onClickContinue}
              disabled={isSubmitting || !eventCoverPhoto}
            >
              CONTINUE
            </Button>
          </div>
        </main>
      </div>
      <EventNameModal
        eventName={eventName}
        onEditEventName={(eventName) => setField("eventName", eventName)}
        isOpen={modals.eventName}
        onClose={() => toggleModal("eventName")}
      />
      <EventStartDateModal
        isOpen={modals.startDate}
        onClose={() => toggleModal("startDate")}
        onSelectDate={(date) => setField("eventStartDate", date)}
      />
      <EventEndDateModal
        isOpen={modals.endDate}
        onClose={() => toggleModal("endDate")}
        onSelectDate={(date) => setField("eventEndDate", date)}
      />
      <NumberOfPhotosModal
        isOpen={modals.numberOfPhotos}
        numberOfPhotos={numberOfPhotos}
        onClose={() => toggleModal("numberOfPhotos")}
        onSelectNumberOfPhotos={(numberOfPhotos) =>
          setField("numberOfPhotos", numberOfPhotos)
        }
      />
      <NumberOfGuestsModal
        isOpen={modals.numberOfGuests}
        numberOfGuest={numberOfGuests}
        onClose={() => toggleModal("numberOfGuests")}
        onSelectNumberOfGuests={(numberOfGuest) =>
          setField("numberOfGuests", numberOfGuest)
        }
      />
    </>
  );
}
