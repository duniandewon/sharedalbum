import {useReducer, useRef} from "react";
import {useLocation, useNavigate} from "react-router";

import {CreateEventUseCase} from "@/domain/events/usecase/CreateEventUseCase.ts";
import {useAuthContext} from "@/presentation/context/authContext.tsx";

export interface EventFormState {
    eventName: string;
    eventCoverPhoto: string;
    eventStartDate: Date;
    eventEndDate: Date;
    numberOfGuests: number;
    numberOfPhotos: number;
    modals: {
        eventName: boolean;
        startDate: boolean;
        endDate: boolean;
        numberOfGuests: boolean;
        numberOfPhotos: boolean;
    };
    isSubmitting: boolean;
    error: string | null;
}

export type EventFormAction =
    | { type: "SET_FIELD"; field: keyof Omit<EventFormState, "modals" | "isSubmitting" | "error">; value: any }
    | { type: "TOGGLE_MODAL"; modal: keyof EventFormState["modals"] }
    | { type: "SET_ALL"; payload: Partial<EventFormState> }
    | { type: "SET_SUBMITTING"; submitting: boolean }
    | { type: "SET_ERROR"; error: string | null };

function eventFormReducer(state: EventFormState, action: EventFormAction): EventFormState {
    switch (action.type) {
        case "SET_FIELD":
            return {
                ...state,
                [action.field]: action.value,
            };
        case "TOGGLE_MODAL":
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.modal]: !state.modals[action.modal],
                },
            };
        case "SET_ALL":
            return {
                ...state,
                ...action.payload,
                modals: {
                    ...state.modals,
                    ...(action.payload.modals ?? {}),
                },
            };
        case "SET_SUBMITTING":
            return {
                ...state,
                isSubmitting: action.submitting,
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}

export function useEventForm(
    createEventUseCase: CreateEventUseCase = new CreateEventUseCase()
) {
    const navigate = useNavigate()
    const location = useLocation()

    const {currentUser} = useAuthContext()

    const state = location.state as {
        mode: "create" | "edit";
        eventName: string
    }

    const mode = useRef<"create" | "edit">(state?.mode ?? "create")

    const initialFormState: EventFormState = {
        eventName: state.eventName,
        eventCoverPhoto: "",
        eventStartDate: new Date(),
        eventEndDate: new Date(),
        numberOfGuests: 10,
        numberOfPhotos: 20,
        modals: {
            eventName: false,
            startDate: false,
            endDate: false,
            numberOfGuests: false,
            numberOfPhotos: false,
        },
        isSubmitting: false,
        error: null
    };

    const [formState, dispatch] = useReducer(eventFormReducer, initialFormState);

    const setField = <K extends keyof Omit<EventFormState, "modals" | "isSubmitting" | "error">>(
        field: K,
        value: EventFormState[K]
    ) => dispatch({type: "SET_FIELD", field, value});

    const toggleModal = (modal: keyof EventFormState["modals"]) =>
        dispatch({type: "TOGGLE_MODAL", modal});

    const setSubmitting = (submitting: boolean) =>
        dispatch({type: "SET_SUBMITTING", submitting});

    const setError = (error: string | null) =>
        dispatch({type: "SET_ERROR", error});

    const onCreateEvent = async () => {
        if (!currentUser || !formState.eventName) return;

        try {
            const newEventId = await createEventUseCase.execute({
                eventName: formState.eventName,
                eventCoverPicture: formState.eventCoverPhoto,
                eventDate: formState.eventStartDate.toISOString(),
                eventEndDate: formState.eventEndDate.toISOString(),
                guestLimit: formState.numberOfGuests,
                photoLimit: formState.numberOfPhotos,
                hostId: currentUser.userId,
            });

            if (newEventId) {
                navigate(`/${newEventId}`);
            }
        } catch (e) {
            console.error(e);
            setError("Something went wrong while creating the event.");
        } finally {
            setSubmitting(false);
        }
    }

    const onSubmitEvent = async () => {
        if (mode.current === "create") {
            await onCreateEvent()
        } else {
            console.log("edit event")
        }
    }

    return {
        ...formState,
        toggleModal,
        setField,
        setError,
        onSubmitEvent,
        onGoBack: () => navigate("/", {replace: true}),
    };
}