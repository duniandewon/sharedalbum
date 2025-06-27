import {useEffect} from "react";

import {useCurrentEvent} from "@/presentation/screens/current-event/useCurrentEvent.ts";
import {EventLobby} from "@/presentation/screens/current-event/components/EventLobby.tsx";
import {EventCamera} from "@/presentation/screens/current-event/components/EventCamera.tsx";
import {useMediaPermission} from "@/presentation/screens/current-event/useMediaPermission.ts";
import {GetMediaPermissionModal} from "@/presentation/screens/current-event/components/GetMediaPermissionModal.tsx";

export function CurrentEvent() {
    const {isLoggedIn, currentEvent, hasJoinedBefore, joinEvent, isLoading} = useCurrentEvent()
    const {mediaPermissionStatus, requestPermissions, startStream, mediaStream} = useMediaPermission()

    useEffect(() => {
        if (mediaPermissionStatus === "granted" && hasJoinedBefore) startStream()
    }, [hasJoinedBefore, mediaPermissionStatus, startStream])

    if (isLoading) return (
        <div className="h-screen w-screen grid place-items-center">
            <h2>Loading...</h2>
        </div>
    )

    const renderEventLobby = () => (
        <div className="h-screen grid items-end p-4">
            <EventLobby
                eventName={currentEvent?.eventName || ""}
                isLoggedIn={isLoggedIn}
                onJoin={() => joinEvent()}
            />
        </div>
    )

    const renderEventCamera = () => (
        <>
            <EventCamera stream={mediaStream} onTakePicture={dataUrl => console.log(dataUrl)}/>
        </>
    )

    return (
        <>
            <GetMediaPermissionModal
                isOpen={mediaPermissionStatus === "idle" || mediaPermissionStatus === "pending"}
                onGetPermission={requestPermissions}
            />
            {hasJoinedBefore ? renderEventCamera() : renderEventLobby()}
        </>
    )
}