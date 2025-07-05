import type {Event} from "@/domain/events/models/Event.ts";
import type {User} from "@/domain/shared/domain/User.ts";
import {useReducer} from "react";

type MediaPermissionStatus = "idle" | "pending" | "granted" | "denied" | "error"
type UploadStatus = "idle" | "uploading" | "error" | "success"
type CameraFacingMode = "user" | "environment"

export interface Participant {
    id: string;
    displayName: string;
}

export interface EventCameraState {
    currentEvent: Event | null
    isEventLoading: boolean
    mediaPermissionStatus: MediaPermissionStatus
    mediaStream: MediaStream | null
    remainingShots: number
    uploadStatus: UploadStatus
    cameraFacingMode: CameraFacingMode
    currentParticipant: Participant | null
}


export type EventCameraAction =
    | { type: "SET_EVENT"; payload: Event }
    | { type: "SET_USER"; payload: User }
    | { type: "SET_MEDIA_PERMISSION"; payload: MediaPermissionStatus }
    | { type: "START_STREAM"; payload: MediaStream }
    | { type: "STOP_STREAM" }
    | { type: "DECREMENT_SHOT" }
    | { type: "INCREMENT_SHOT" }
    | { type: "SET_UPLOAD_STATUS"; payload: UploadStatus }
    | { type: "SET_HAS_JOINED_BEFORE"; payload: boolean }
    | { type: "SET_EVENT_LOADING"; payload: boolean }
    | { type: "JOIN_EVENT", payload: string }
    | { type: "SET_REMAINING_SHOTS", payload: number }
    | { type: "SET_CAMERA_FACING_MODE", payload: CameraFacingMode }
    | { type: "SET_CURRENT_PARTICIPANT"; payload: Participant | null }
    | { type: "UPDATE_PARTICIPANT", payload: string }

function eventCameraReducer(state: EventCameraState, action: EventCameraAction): EventCameraState {
    switch (action.type) {
        case "DECREMENT_SHOT":
            return {
                ...state,
                remainingShots: Math.max(0, state.remainingShots - 1),
            }
        case "INCREMENT_SHOT":
            return {
                ...state,
                remainingShots: state.remainingShots + 1,
            }
        case "SET_EVENT":
            return {
                ...state,
                currentEvent: action.payload,
            }
        case "SET_EVENT_LOADING":
            return {
                ...state,
                isEventLoading: action.payload
            }
        case "SET_MEDIA_PERMISSION":
            return {
                ...state,
                mediaPermissionStatus: action.payload
            }
        case "SET_UPLOAD_STATUS":
            return {
                ...state,
                uploadStatus: action.payload,
            }
        case "SET_REMAINING_SHOTS":
            return {
                ...state,
                remainingShots: action.payload,
            }
        case "START_STREAM":
            return {
                ...state,
                mediaStream: action.payload,
            }
        case "STOP_STREAM":
            return {
                ...state,
                mediaStream: null,
            }
        case "SET_CAMERA_FACING_MODE":
            return {
                ...state,
                cameraFacingMode: action.payload
            }
        case "SET_CURRENT_PARTICIPANT":
            return {
                ...state,
                currentParticipant: action.payload,
            }
        case "UPDATE_PARTICIPANT": {
            if (!state.currentEvent) return state

            return {
                ...state,
                currentEvent: {
                    ...state.currentEvent,
                    participants: [...state.currentEvent?.participants || "", action.payload]
                }
            }
        }
        default:
            return state
    }
}

export function useEventCameraReducer() {
    const initialState: EventCameraState = {
        currentEvent: null,
        isEventLoading: true,
        remainingShots: 0,
        uploadStatus: "idle",
        mediaStream: null,
        mediaPermissionStatus: "idle",
        cameraFacingMode: "user",
        currentParticipant: null
    }

    const [state, dispatch] = useReducer(eventCameraReducer, initialState)

    return {state, dispatch}
}