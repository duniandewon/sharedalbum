import {type Dispatch, useCallback, useEffect, useMemo, useRef} from "react";

import {useParams} from "react-router";

import {GetEventByShareIdUseCase} from "@/domain/events/usecase/GetEventByShareIdUseCase.ts";
import {useAuthContext} from "@/presentation/context/authContext.tsx";
import {JoinEventUseCase} from "@/domain/events/usecase/JoinEventUseCase.ts";
import type {EventCameraAction, EventCameraState} from "@/presentation/screens/current-event/useEventCameraReducer.ts";
import {
    getUnauthenticatedParticipant, removeUnauthenticatedParticipant, saveUnauthenticatedParticipant
} from "@/presentation/screens/current-event/utils/unauthenticatedParticipantStorage.ts";

export function useCurrentEvent(state: EventCameraState, dispatch: Dispatch<EventCameraAction>, getEventByShareIdUseCase = new GetEventByShareIdUseCase(), joinEventUseCase = new JoinEventUseCase()) {
    const params = useParams()

    const {currentUser: loggedInUser} = useAuthContext()

    const didRunRef = useRef(false)

    const userHasJoinedBefore = useMemo(() => {
        if (!state.currentEvent) return false;

        const currentParticipant = state.currentParticipant;
        if (!currentParticipant) return false;

        return state.currentEvent.participants.includes(currentParticipant.id);
    }, [state.currentEvent, state.currentParticipant]);

    const getCurrentEvent = useCallback(async () => {
        if (!params.eventShareId) return;

        try {
            const currentEvent = await getEventByShareIdUseCase.execute(params.eventShareId);

            if (currentEvent) {
                dispatch({type: "SET_EVENT", payload: currentEvent});
            }
        } catch (e) {
            console.log("error:", e);
        } finally {
            dispatch({type: "SET_EVENT_LOADING", payload: false});
        }
    }, [dispatch, getEventByShareIdUseCase, params.eventShareId]);

    const joinEvent = useCallback(async (displayName: string) => {
        const {currentEvent} = state;

        if (!currentEvent) return;

        const participantName = loggedInUser?.displayName || displayName
        const participantId = loggedInUser?.userId || `${participantName}-${new Date().getTime()}`

        try {
            await joinEventUseCase.execute(currentEvent.eventId, participantId, participantName);

            if (!loggedInUser) saveUnauthenticatedParticipant({displayName: participantName, id: participantId})
            dispatch({type: "SET_CURRENT_PARTICIPANT", payload: {id: participantId, displayName: participantName}});
            dispatch({type: "UPDATE_PARTICIPANT", payload: participantId})
        } catch (err) {
            console.error("Failed to join event", err);
        }
    }, [dispatch, joinEventUseCase, loggedInUser, state]);

    const setUnauthenticatedParticipant = useCallback((participant: { id: string; displayName: string }) => {
        saveUnauthenticatedParticipant(participant);

        dispatch({
            type: "SET_CURRENT_PARTICIPANT",
            payload: participant
        });
    }, [dispatch]);

    const clearUnauthenticatedParticipant = useCallback(() => {
        removeUnauthenticatedParticipant()
        dispatch({
            type: "SET_CURRENT_PARTICIPANT",
            payload: null
        });
    }, [dispatch]);

    useEffect(() => {
        if (loggedInUser) {
            dispatch({
                type: "SET_CURRENT_PARTICIPANT",
                payload: {
                    id: loggedInUser.userId,
                    displayName: loggedInUser.displayName || loggedInUser.email || "User"
                }
            });
        } else {
            const unauthedParticipant = getUnauthenticatedParticipant();
            if (unauthedParticipant) {
                dispatch({
                    type: "SET_CURRENT_PARTICIPANT",
                    payload: unauthedParticipant
                });
            }
        }
    }, [loggedInUser, dispatch]);

    useEffect(() => {
        if (!didRunRef.current) {
            getCurrentEvent()
            didRunRef.current = true
        }
    }, [loggedInUser, dispatch, getCurrentEvent])

    return {
        isLoggedIn: !!loggedInUser,
        joinEvent,
        userHasJoinedBefore,
        currentParticipant: state.currentParticipant,
        setUnauthenticatedParticipant,
        clearUnauthenticatedParticipant
    }
}