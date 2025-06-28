import {type Dispatch, useCallback, useEffect, useRef, useState} from "react";
import type {EventCameraAction, EventCameraState} from "@/presentation/screens/current-event/useEventCameraReducer.ts";

export function useMediaPermission(state: EventCameraState, dispatch: Dispatch<EventCameraAction>) {
    const [error, setError] = useState<Error | null>(null)

    const mediaStreamConstraints = useRef<MediaStreamConstraints>({
        video: true
    }).current

    const isFirstLoad = useRef(true)

    const checkPermission = useCallback(async () => {
        try {
            const result = await navigator.permissions.query({name: "camera" as PermissionName})

            if (result.state === "granted") {
                dispatch({type: "SET_MEDIA_PERMISSION", payload: "granted"})
            } else if (result.state === "denied") {
                dispatch({type: "SET_MEDIA_PERMISSION", payload: "denied"})
            } else {
                dispatch({type: "SET_MEDIA_PERMISSION", payload: "idle"})
            }
        } catch (err) {
            console.error("Unable to check media permission:", err)
        }
    }, [dispatch])

    const requestPermissions = useCallback(async () => {
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
    }, [dispatch, mediaStreamConstraints])

    const startStream = useCallback(async () => {
        setError(null)

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
            dispatch({type: "START_STREAM", payload: mediaStream})
        } catch (err) {
            console.error("Stream error:", err)
        }
    }, [dispatch, mediaStreamConstraints])

    const stopStream = useCallback(() => {
        const {mediaStream} = state
        if (mediaStream) mediaStream.getTracks().forEach(track => track.stop())
        dispatch({type: "STOP_STREAM"})
        dispatch({type: "SET_MEDIA_PERMISSION", payload: "idle"})
    }, [dispatch, state])

    useEffect(() => {
        if (isFirstLoad.current)
            checkPermission()

        return () => {
            isFirstLoad.current = false
        }
    }, [checkPermission])

    return {
        mediaPermissionError: error,
        requestPermissions,
        startStream,
        stopStream,
    }
}