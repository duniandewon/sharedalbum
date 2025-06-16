import {useState} from "react";

import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";

import {Button} from "@/presentation/components/ui/button.tsx";
import {Calendar} from "@/presentation/components/ui/calendar.tsx";
import {Modal} from "@/presentation/components/ui/modal.tsx";

interface Props {
    date: Date,
    onSelectDate: (date: Date | undefined) => void
}

export function DatePicker({date, onSelectDate}: Props) {
    const [open, setOpen] = useState(false)

    const handleOnSelect = (date: Date | undefined) => {
        onSelectDate(date)
        setOpen(false)
    }

    return <>
        <Button type="button" variant="outline" className="justify-baseline" onClick={() => setOpen(prev => !prev)}>
            <CalendarIcon/>
            {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
        <Modal open={open} onClose={() => setOpen(prev => !prev)}>
            <Calendar
                disabled={{before: new Date()}}
                className="rounded-2xl bg-accent"
                mode="single"
                selected={date}
                onSelect={handleOnSelect}/>
        </Modal>
    </>
}