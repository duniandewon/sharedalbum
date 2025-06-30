import {useEffect, useMemo, useRef, useState} from "react";
import {GetPicturesByEventIdUseCase} from "@/domain/picture/usecase/GetPicturesByEventIdUseCase.ts";
import type {Picture} from "@/domain/picture/models/Picture.ts";
import {useLocation, useNavigate, useParams} from "react-router";

export function useEventAlbum(getPicturesByEventIdUseCase = new GetPicturesByEventIdUseCase()) {
    const params = useParams()
    const navigate = useNavigate()

    const [eventPictures, setEventPictures] = useState<Record<string, Picture[]>>({})

    const isFirstLoad = useRef(true)

    const location = useLocation()

    const routeState = location.state as {
        eventName: string;
        participantsNumber: number
    }

    const totalPictures = useMemo(() => {
        return Object.values(eventPictures).reduce(
            (total, pictures) => total + pictures.length,
            0
        )
    }, [eventPictures])

    const onGoBack = () => navigate(-1)

    useEffect(() => {
        if (isFirstLoad.current && params.eventShareId) {
            const fetchPictures = async () => {
                const res = await getPicturesByEventIdUseCase.execute(params.eventShareId || "")

                setEventPictures(res)
            }

            fetchPictures()

            isFirstLoad.current = false
        }
    }, [getPicturesByEventIdUseCase, params.eventShareId]);

    return {eventPictures, totalPictures, onGoBack, ...routeState}
}