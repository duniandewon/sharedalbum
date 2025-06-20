import {useCallback, useEffect, useRef, useState} from "react";

import type {Event} from "@/domain/events/models/Event.ts";
import {useAuthContext} from "@/presentation/context/authContext.tsx";
import {GetEventByHostIdUseCase} from "@/domain/events/usecase/GetEventByHostIdUseCase.ts";

export function useEventsHistory(getEventsByHostIdUseCase: GetEventByHostIdUseCase = new GetEventByHostIdUseCase()) {
    const [eventsHosting, setEventsHosting] = useState<Event[]>([])
    const [isLoadingEventsHosting, setIsLoadingEventsHosting] = useState(true)

    const {currentUser} = useAuthContext()

    const isFirstLoad = useRef(true)

    const getHostingEvents = useCallback(async () => {
        if (!currentUser) return;
        try {
            const events = await getEventsByHostIdUseCase.execute(currentUser.userId)

            setEventsHosting(events)
        } catch (e) {
            console.log("Fetch events hosting error:", e)
        } finally {
            setIsLoadingEventsHosting(false)
        }
    }, [currentUser, getEventsByHostIdUseCase])

    useEffect(() => {
        if (isFirstLoad.current) {
            getHostingEvents()
        }

        return () => {
            isFirstLoad.current = false
        }
    }, [getHostingEvents]);

    return {
        eventsHosting,
        isLoadingEventsHosting
    }
}