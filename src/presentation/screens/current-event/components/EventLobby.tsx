import {Button} from "@/presentation/components/ui/button.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";

interface Props {
    eventName: string
    isLoggedIn: boolean
    onJoin: () => void
}

export function EventLobby({onJoin, eventName, isLoggedIn}: Props) {
    const renderJoinButton = () => <Button className="w-full" onClick={() => onJoin()}>Join Event</Button>

    const renderJoinEventForm = () => (
        <form className="space-y-4" onSubmit={e => {
            e.preventDefault();
            onJoin();
        }}>
            <Input placeholder="What should we call you?"/>
            <Button className="w-full">Join Event</Button>
        </form>
    )

    return (
        <div className="space-y-4">
            <h2 className="text-center font-bold">{eventName}</h2>
            {isLoggedIn ? renderJoinButton() : renderJoinEventForm()}
        </div>
    )
}