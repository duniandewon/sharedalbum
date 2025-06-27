import {GetEventByShareIdUseCase} from "@/domain/events/usecase/GetEventByShareIdUseCase.ts";
import {useParams} from "react-router";
import {useCallback, useEffect, useState} from "react";
import {useAuthContext} from "@/presentation/context/authContext.tsx";
import type {Event} from "@/domain/events/models/Event.ts";
import {JoinEventUseCase} from "@/domain/events/usecase/JoinEventUseCase.ts";

export function useCurrentEvent(getEventByShareIdUseCase = new GetEventByShareIdUseCase(), joinEventUseCase = new JoinEventUseCase()) {
    const params = useParams()

    const {currentUser} = useAuthContext()
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null)

    const [hasJoinedBefore, setHasJoinedBefore] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const getCurrentEvent = useCallback(async () => {
        try {
            if (!params.eventShareId) return;
            const currentEvent = await getEventByShareIdUseCase.execute(params.eventShareId)

            setCurrentEvent(currentEvent)

            const joined = currentEvent?.participants.includes(currentUser?.userId || "")
            setHasJoinedBefore(!!joined)
        } catch (e) {
            console.log("error:", e)
        } finally {
            setIsLoading(false)
        }
    }, [currentUser?.userId, getEventByShareIdUseCase, params.eventShareId])

    const joinEvent = useCallback(async () => {
        if (!currentUser && !currentEvent) return;
        setHasJoinedBefore(true)

        try {
            await joinEventUseCase.execute(currentEvent?.eventId || "", currentUser?.userId || "")

            setCurrentEvent(prev => prev ? {
                ...prev,
                participants: [...prev.participants, currentUser?.userId || ""]
            } : prev)
        } catch (err) {
            console.error("Failed to join event", err)
        }
    }, [currentEvent, currentUser, joinEventUseCase])

    useEffect(() => {
        if (currentUser) getCurrentEvent()

    }, [currentUser, getCurrentEvent]);
    return {isLoggedIn: !!currentUser, currentEvent, hasJoinedBefore, joinEvent, isLoading}
}