import {type FormEvent, useState} from "react";

import {Modal} from "@/presentation/components/ui/modal.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Input} from "@/presentation/components/ui/input.tsx";
import {DatePicker} from "@/presentation/components/DatePicker.tsx";

interface Props {
    isOpen: boolean
    onClose: () => void
    onSelectDate: (date: Date) => void
}

function getCurrentTimeString() {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

export function EventEndDateModal({isOpen, onClose, onSelectDate}: Props) {
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState(getCurrentTimeString())

    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const [hours, minutes, seconds] = time.split(':').map(Number);

        const combinedDate = new Date(date);

        combinedDate.setHours(hours, minutes, seconds);
        onSelectDate(combinedDate)
        onClose()
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <form className="space-y-4" onSubmit={handleConfirm}>
                <div>
                    <h2 className="mb-1 text-lg font-bold">
                        Ending
                    </h2>
                    <p className="text-xs">
                        This is when your album locks and submissions are no longer allowed.
                    </p>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-4">
                    <DatePicker date={date} onSelectDate={(date) => setDate(date || new Date)}/>
                    <Input
                        type="time"
                        id="time"
                        step="1"
                        value={time}
                        onChange={e => {
                            setTime(e.target.value)
                        }}
                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
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