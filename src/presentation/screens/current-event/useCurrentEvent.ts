import {type Dispatch, useCallback, useEffect, useRef} from "react";

import {useParams} from "react-router";

import {GetEventByShareIdUseCase} from "@/domain/events/usecase/GetEventByShareIdUseCase.ts";
import {useAuthContext} from "@/presentation/context/authContext.tsx";
import {JoinEventUseCase} from "@/domain/events/usecase/JoinEventUseCase.ts";
import type {EventCameraAction, EventCameraState} from "@/presentation/screens/current-event/useEventCameraReducer.ts";

export function useCurrentEvent(state: EventCameraState, dispatch: Dispatch<EventCameraAction>, getEventByShareIdUseCase = new GetEventByShareIdUseCase(), joinEventUseCase = new JoinEventUseCase()) {
    const params = useParams()

    const {currentUser} = useAuthContext()

    const didRunRef = useRef(false)

    const getCurrentEvent = useCallback(async () => {
        if (!params.eventShareId) return;

        try {
            const currentEvent = await getEventByShareIdUseCase.execute(params.eventShareId)

            if (currentEvent) {
                dispatch({type: "SET_EVENT", payload: currentEvent})
                const joined = currentEvent?.participants.includes(currentUser?.userId || "")
                dispatch({type: "SET_HAS_JOINED_BEFORE", payload: joined})
            }
        } catch (e) {
            console.log("error:", e)
        } finally {
            dispatch({type: "SET_EVENT_LOADING", payload: false})
        }
    }, [currentUser?.userId, dispatch, getEventByShareIdUseCase, params.eventShareId])

    const joinEvent = useCallback(async () => {
        const {currentEvent} = state
        if (!currentUser && !currentEvent) return;

        try {
            await joinEventUseCase.execute(currentEvent?.eventId || "", currentUser?.userId || "")
            dispatch({type: "SET_HAS_JOINED_BEFORE", payload: true})
        } catch (err) {
            console.error("Failed to join event", err)
        }
    }, [currentUser, dispatch, joinEventUseCase, state])

    useEffect(() => {
        if (currentUser && !didRunRef.current) {
            getCurrentEvent()
            didRunRef.current = true
        }
    }, [currentUser, dispatch, getCurrentEvent])

    return {isLoggedIn: !!currentUser, joinEvent}
}