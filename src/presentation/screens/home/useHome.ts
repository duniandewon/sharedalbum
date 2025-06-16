import {useState} from "react";
import {useNavigate} from "react-router";

export function useHome() {
    const [eventName, setEventName] = useState("")
    const navigate = useNavigate();

    const onCreateEventName = () => {
        navigate(`edit-event`, {
            state: {
                eventName
            }
        })
    }

    return {
        eventName,
        setEventName,
        onCreateEventName
    }

}