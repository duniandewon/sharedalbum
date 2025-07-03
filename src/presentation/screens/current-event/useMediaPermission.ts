import {type Dispatch, useCallback, useEffect, useMemo, useRef, useState} from "react";
import type {EventCameraAction, EventCameraState} from "@/presentation/screens/current-event/useEventCameraReducer.ts";

export function useMediaPermission(state: EventCameraState, dispatch: Dispatch<EventCameraAction>) {
    const [error, setError] = useState<Error | null>(null)

    const mediaStreamConstraints = useMemo<MediaStreamConstraints>(() => (
        {
            video: {
                facingMode: state.cameraFacingMode
            }
        }
    ), [state.cameraFacingMode])

    const isFirstLoad = useRef(true)

    const checkPermission = useCallback(async () => {
        try {
            const result = await navigator.permissions.query({
                name: "camera" as PermissionName,
            });

            if (result.state === "granted") {
                dispatch({type: "SET_MEDIA_PERMISSION", payload: "granted"});
            } else if (result.state === "denied") {
                dispatch({type: "SET_MEDIA_PERMISSION", payload: "denied"});
            } else {
                dispatch({type: "SET_MEDIA_PERMISSION", payload: "idle"});
            }
        } catch (err) {
            console.error("Unable to check media permission:", err)
        }
    }, [dispatch])

    const requestPermissions = async () => {
        dispatch({type: "SET_MEDIA_PERMISSION", payload: "pending"})

        try {
            const tempStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
            tempStream.getTracks().forEach(track => track.stop())

            dispatch({type: "SET_MEDIA_PERMISSION", payload: "granted"})
            return true
        } catch (err: any) {
            console.error("Permission error:", err)
            dispatch({type: "SET_MEDIA_PERMISSION", payload: err.name === "NotAllowedError" ? "denied" : "error"})
            return false
        }
    }

    const stopStream = useCallback(() => {
        const {mediaStream} = state;
        if (mediaStream) mediaStream.getTracks().forEach((track) => track.stop());
        dispatch({type: "STOP_STREAM"});
    }, [dispatch, state])

    const startStream = useCallback(async () => {
        if (state.mediaPermissionStatus !== "granted") return

        setError(null)

        stopStream()

        await new Promise((resolve) => setTimeout(resolve, 100));

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
            dispatch({type: "START_STREAM", payload: mediaStream})
        } catch (err) {
            console.error("Stream error:", err)
        }
    }, [dispatch, mediaStreamConstraints, state.mediaPermissionStatus, stopStream])

    const toggleCameraFacingMode = () => {
        stopStream()

        dispatch({type: "SET_CAMERA_FACING_MODE", payload: state.cameraFacingMode === "user" ? "environment" : "user"})
    }

    useEffect(() => {
        if (isFirstLoad.current)
            checkPermission()

        isFirstLoad.current = false
    }, [checkPermission, state.mediaPermissionStatus])

    useEffect(() => {
        if (state.mediaPermissionStatus === "granted") startStream()
    }, [state.mediaPermissionStatus, state.cameraFacingMode])

    return {
        mediaPermissionError: error,
        requestPermissions,
        startStream,
        stopStream,
        toggleCameraFacingMode
    }
}