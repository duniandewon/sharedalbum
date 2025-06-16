import {type ChangeEvent, type FormEvent, useState} from "react";

import {Modal} from "@/presentation/components/ui/modal.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";

interface Props {
    isOpen: boolean
    onClose: () => void
    eventName: string
    onEditEventName: (eventName: string) => void
}

export function EventNameModal({isOpen, onEditEventName, eventName, onClose}: Props) {
    const [currEventName, setCurrEventName] = useState(eventName)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onEditEventName(currEventName)
        onClose()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setCurrEventName(e.target.value)

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <h2 className="mb-1 text-lg font-bold">
                        Name of Event
                    </h2>
                </div>
                <div>
                    <Input value={currEventName} onChange={handleChange}/>
                </div>
                <div className="flex justify-end">
                    <Button
                        type="button"
                        onClick={onClose}
                        variant="link"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="link"
                    >
                        OK
                    </Button>
                </div>
            </form>
        </Modal>
    )
}