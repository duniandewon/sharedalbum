import {Modal} from "@/presentation/components/ui/modal.tsx";
import {type FormEvent, useState} from "react";
import {SquareRating} from "@/presentation/components/SquareRating.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Users2Icon} from "lucide-react";

interface Props {
    isOpen: boolean
    onClose: () => void
    numberOfGuest: number
    onSelectNumberOfGuests: (numberOfGuest: number) => void
}

export function NumberOfGuestsModal({onSelectNumberOfGuests, numberOfGuest, isOpen, onClose}: Props) {
    const [selectedNumberOfGuest, setSelectedNumberOfGuest] = useState(numberOfGuest)

    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSelectNumberOfGuests(selectedNumberOfGuest)
        onClose()
    }
    return <Modal open={isOpen} onClose={onClose}>
        <form className="space-y-4" onSubmit={handleConfirm}>
            <div>
                <h2 className="mb-1 text-lg font-bold">
                    Number of guest
                </h2>
                <p className="text-xs">
                    How many people are you expecting to attend to your event?
                </p>
            </div>
            <div className="space-y-4">
                <SquareRating
                    onRatingChange={numberOfGuest => setSelectedNumberOfGuest(numberOfGuest)}
                    ratings={[10, 15, 25, 50, 75, 100]}
                />
                <div className="flex items-center gap-1">
                    <Users2Icon size={16}/>
                    <p>{selectedNumberOfGuest} people</p>
                </div>
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
}