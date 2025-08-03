import {Button} from "@/presentation/components/ui/button.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {useState} from "react";

interface Props {
    eventName: string
    eventCoverPhoto: string
    isLoggedIn: boolean
    onJoin: (displayName: string) => void
}

export function EventLobby({onJoin, eventName, isLoggedIn, eventCoverPhoto}: Props) {
    const [displayName, setDisplayName] = useState("")

    const renderJoinButton = () => <Button className="w-full" onClick={() => onJoin("")}>Join Event</Button>

    const renderJoinEventForm = () => (
        <form className="space-y-4" onSubmit={e => {
            e.preventDefault();
            onJoin(displayName);
        }}>
            <Input placeholder="What should we call you?"
                   value={displayName}
                   onChange={e => setDisplayName(e.target.value)}
            />
            <Button className="w-full">Join Event</Button>
        </form>
    )

    return (
        <div
            className="space-y-4 h-dvh relative grid items-end p-4"
            style={{
                backgroundImage: `url(${eventCoverPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}>
            <div
                className="absolute top-0 w-full h-full bg-black opacity-50 pointer-events-none"
                aria-hidden="true"
            />
            <div className="relative z-10 space-y-2">
                <h2 className="text-center font-bold text-2xl">{eventName}</h2>
                {isLoggedIn ? renderJoinButton() : renderJoinEventForm()}
            </div>
        </div>
    )
}