import {useCallback, useEffect, useRef, useState} from "react";

type MediaStatus = "idle" | "pending" | "granted" | "denied" | "error"

export function useMediaPermission() {
    const [status, setStatus] = useState<MediaStatus>("idle")
    const [error, setError] = useState<Error | null>(null)
    const [stream, setStream] = useState<MediaStream | null>(null)

    const mediaStreamConstraints = useRef<MediaStreamConstraints>({
        video: true
    }).current

    const checkPermission = useCallback(async () => {
        try {
            const result = await navigator.permissions.query({name: "camera" as PermissionName})

            if (result.state === "granted") {
                setStatus("granted")
            } else if (result.state === "denied") {
                setStatus("denied")
            } else {
                setStatus("idle")
            }
        } catch (err: any) {
            console.error("Unable to check media permission:", err)
        }
    }, [])

    const requestPermissions = useCallback(async () => {
        setStatus("pending")
        setError(null)

        try {
            const tempStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
            tempStream.getTracks().forEach(track => track.stop())

            setStatus("granted")
            return true
        } catch (err: any) {
            console.error("Permission error:", err)
            setStatus(err.name === "NotAllowedError" ? "denied" : "error")
            setError(err)
            return false
        }
    }, [mediaStreamConstraints])

    const startStream = useCallback(async () => {
        setError(null)

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
            setStream(mediaStream)
        } catch (err: any) {
            console.error("Stream error:", err)
            setError(err)
        }
    }, [mediaStreamConstraints])

    const stopStream = useCallback(() => {
        if (stream) stream.getTracks().forEach(track => track.stop())
        setStream(null)
        setStatus("idle")
    }, [stream])

    useEffect(() => {
        checkPermission()
    }, [checkPermission])

    return {
        mediaPermissionStatus: status,
        mediaPermissionError: error,
        mediaStream: stream,
        requestPermissions,
        startStream,
        stopStream,
        hasVideo: !!stream?.getVideoTracks().length,
        hasAudio: !!stream?.getAudioTracks().length,
    }
}