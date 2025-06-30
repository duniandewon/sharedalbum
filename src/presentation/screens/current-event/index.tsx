import {useEffect} from "react";

import {useNavigate} from "react-router";

import {useCurrentEvent} from "@/presentation/screens/current-event/useCurrentEvent.ts";
import {EventLobby} from "@/presentation/screens/current-event/components/EventLobby.tsx";
import {EventCamera} from "@/presentation/screens/current-event/components/EventCamera.tsx";
import {useMediaPermission} from "@/presentation/screens/current-event/useMediaPermission.ts";
import {GetMediaPermissionModal} from "@/presentation/screens/current-event/components/GetMediaPermissionModal.tsx";
import {usePictureCapture} from "@/presentation/screens/current-event/usePictureCapture.ts";
import {useEventCameraReducer} from "@/presentation/screens/current-event/useEventCameraReducer.ts";

export function CurrentEvent() {
    const {state, dispatch} = useEventCameraReducer()

    const {joinEvent, isLoggedIn} = useCurrentEvent(state, dispatch)
    const {requestPermissions, startStream, stopStream} = useMediaPermission(state, dispatch)
    const {uploadPicture, canTakePicture} = usePictureCapture(state, dispatch)

    const navigate = useNavigate()

    const onNavigateToAlbum = () => {
        stopStream()
        navigate("album", {
            state: {
                eventName: state.currentEvent?.eventName || "",
                participantsNumber: state.currentEvent?.participants?.length || 0
            }
        })
    }

    useEffect(() => {
        if (state.mediaPermissionStatus === "granted" && state.hasJoinedBefore) startStream()
    }, [startStream, state.hasJoinedBefore, state.mediaPermissionStatus])

    if (state.isEventLoading) return (
        <div className="h-screen w-screen grid place-items-center">
            <h2>Loading...</h2>
        </div>
    )

    return (
        <div>
            {
                state.mediaPermissionStatus === "idle" || state.mediaPermissionStatus === "pending" ?
                    <GetMediaPermissionModal
                        isOpen={state.mediaPermissionStatus === "idle" || state.mediaPermissionStatus === "pending"}
                        onGetPermission={requestPermissions}
                    /> : null
            }
            {state.hasJoinedBefore ? (
                <EventCamera
                    remainingShot={state.remainingShots}
                    canTakePicture={canTakePicture}
                    stream={state.mediaStream}
                    onTakePicture={uploadPicture}
                    onNavigateToAlbum={onNavigateToAlbum}
                />
            ) : (
                <div className="h-screen grid items-end p-4">
                    <EventLobby
                        eventName={state.currentEvent?.eventName || ""}
                        isLoggedIn={isLoggedIn}
                        onJoin={() => joinEvent()}
                    />
                </div>
            )}
        </div>
    )
}