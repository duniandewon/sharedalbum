import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {ArrowRight} from "lucide-react";
import {useHome} from "@/presentation/screens/home/useHome.ts";

export function Home() {
    const {eventName, setEventName, onCreateEventName} = useHome()

    return (
        <div className="self-end w-full">
            <form className="grid gap-2" onSubmit={e => {
                e.preventDefault()
                onCreateEventName()
            }}>
                <Input
                    value={eventName}
                    placeholder="What's the occasion?"
                    onChange={e => setEventName(e.target.value)}
                />
                <Button disabled={!eventName}>Continue <ArrowRight/></Button>
            </form>
        </div>
    )
}