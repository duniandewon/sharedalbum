import {type Dispatch, useCallback} from "react";

import {UploadPictureUseCase} from "@/domain/picture/usecase/UploadPictureUseCase.ts";
import type {EventCameraAction, EventCameraState} from "@/presentation/screens/current-event/useEventCameraReducer.ts";
import {useAuthContext} from "@/presentation/context/authContext.tsx";

export function usePictureCapture(state: EventCameraState, dispatch: Dispatch<EventCameraAction>, uploadPictureUseCase = new UploadPictureUseCase()) {
    const {currentUser} = useAuthContext()

    const {currentEvent} = state

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