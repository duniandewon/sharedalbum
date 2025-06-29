import {type Dispatch, useCallback, useEffect, useRef} from "react";

import {UploadPictureUseCase} from "@/domain/picture/usecase/UploadPictureUseCase.ts";
import type {EventCameraAction, EventCameraState} from "@/presentation/screens/current-event/useEventCameraReducer.ts";
import {useAuthContext} from "@/presentation/context/authContext.tsx";
import {GetPicturesByUploaderIdUseCase} from "@/domain/picture/usecase/GetPicturesByUploaderIdUseCase.ts";

export function usePictureCapture(state: EventCameraState, dispatch: Dispatch<EventCameraAction>, uploadPictureUseCase = new UploadPictureUseCase(), getPicturesByUploaderIdUseCase = new GetPicturesByUploaderIdUseCase()) {
    const {currentUser} = useAuthContext()

    const {currentEvent} = state

    const isFirstLoad = useRef(true)

    useEffect(() => {
        if (currentEvent && currentUser && isFirstLoad.current) {
            const fetchPicturesTaken = async () => {
                const pictures = await getPicturesByUploaderIdUseCase.execute(currentEvent.eventId, currentUser?.userId)

                const remaining = Math.max(0, currentEvent.photoLimit - pictures.length)

                dispatch({type: "SET_REMAINING_SHOTS", payload: remaining})
            }

            fetchPicturesTaken()

            isFirstLoad.current = false
        }
    }, [currentEvent, currentUser, dispatch, getPicturesByUploaderIdUseCase]);

    const uploadPicture = useCallback(async (picture: string) => {
        if (!currentUser || !currentEvent) return
        dispatch({type: "DECREMENT_SHOT"})
        try {
            dispatch({type: "SET_UPLOAD_STATUS", payload: "uploading"})

            await uploadPictureUseCase.execute(
                currentUser.userId,
                currentUser.displayName || "",
                currentEvent.eventId,
                picture
            )

            dispatch({type: "SET_UPLOAD_STATUS", payload: "success"})
        } catch (err) {
            console.log("uploadPicture err", err)
            dispatch({type: "INCREMENT_SHOT"})
            dispatch({type: "SET_UPLOAD_STATUS", payload: "error"})
        }
    }, [currentEvent, currentUser, dispatch, uploadPictureUseCase])

    return {
        uploadPicture,
        canTakePicture: state.remainingShots > 0,
        uploadStatus: state.uploadStatus,
    }
}