import {useState} from "react";
import {useLocation, useNavigate} from "react-router";

export function useEditEvent() {
    const navigate = useNavigate()
    const {state} = useLocation()

    const [eventNameModalOpen, setEventNameModalOpen] = useState(false)
    const [startDateModalOpen, setStartDateModalOpen] = useState(false)
    const [endDateModalOpen, setEndDateModalOpen] = useState(false)
    const [numberOfGuestModalOpen, setNumberOfGuestModalOpen] = useState(false)
    const [numberOfPhotosModalOpen, setNumberOfPhotosModalOpen] = useState(false)

    const [eventName, setEventName] = useState(state.eventName || "")
    const [eventCoverPhoto, setEventCoverPhoto] = useState("")
    const [eventStartDate, setEventStartDate] = useState(new Date())
    const [eventEndDate, setEventEndDate] = useState(new Date())
    const [numberOfGuests, setNumberOfGuests] = useState(10)
    const [numberOfPhotos, setNumberOfPhotos] = useState(20)

    const toggleEventNameModalOpen = () => setEventNameModalOpen(prev => !prev)
    const toggleStartDateModalOpen = () => setStartDateModalOpen(prev => !prev)
    const toggleEndDateModalOpen = () => setEndDateModalOpen(prev => !prev)
    const toggleNumberOfGuestsModalOpen = () => setNumberOfGuestModalOpen(prev => !prev)
    const toggleNumberOfPhotosModalOpen = () => setNumberOfPhotosModalOpen(prev => !prev)

    const selectEventStartDate = (date: Date) => setEventStartDate(date)
    const selectEventEndDate = (date: Date) => setEventEndDate(date)
    const editEventName = (eventName: string) => setEventName(eventName)
    const selectNumberOfPhotos = (numberOfPhotos: number) => setNumberOfPhotos(numberOfPhotos)
    const selectNumberOfGuests = (numberOfGuests: number) => setNumberOfGuests(numberOfGuests)
    const selectEventCoverPhoto = (eventCoverPhoto: string) => setEventCoverPhoto(eventCoverPhoto)
    const onGoBack = () => navigate("/", {replace: true})

    return {
        eventName,
        eventCoverPhoto,
        eventStartDate,
        eventEndDate,
        numberOfGuests,
        numberOfPhotos,
        eventNameModalOpen,
        startDateModalOpen,
        endDateModalOpen,
        numberOfGuestModalOpen,
        numberOfPhotosModalOpen,
        selectEventStartDate,
        selectEventEndDate,
        editEventName,
        selectNumberOfPhotos,
        selectNumberOfGuests,
        selectEventCoverPhoto,
        toggleStartDateModalOpen,
        toggleEventNameModalOpen,
        toggleEndDateModalOpen,
        toggleNumberOfGuestsModalOpen,
        toggleNumberOfPhotosModalOpen,
        onGoBack
    }
}