import {Modal} from "@/presentation/components/ui/modal.tsx";
import {type FormEvent, useMemo, useState} from "react";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Check} from "lucide-react";

interface Props {
    isOpen: boolean
    onClose: () => void
    numberOfPhotos: number
    onSelectNumberOfPhotos: (numberOfPhotos: number) => void
}

export function NumberOfPhotosModal({onSelectNumberOfPhotos, numberOfPhotos = 10, onClose, isOpen}: Props) {
    const [selectedNumberOfPhotos, setSelectedNumberOfPhotos] = useState(numberOfPhotos)

    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSelectNumberOfPhotos(selectedNumberOfPhotos)
        onClose()
    }
    return (
        <Modal open={isOpen} onClose={onClose}>
            <form className="space-y-4" onSubmit={handleConfirm}>
                <div>
                    <h2 className="mb-1 text-lg font-bold">
                        Number of photos
                    </h2>
                    <p className="text-xs">
                        This is the number of photos each person can take before the end of event.
                    </p>
                </div>
                <div className="space-y-4">
                    {
                        useMemo(() => [10, 15, 20, 25].map(photos => {
                            return (
                                <div key={photos} className="relative flex bg-secondary w-full">
                                    <input
                                        className="hidden"
                                        type="radio"
                                        name="number-of-photos"
                                        id={`number-of-photos-${photos}`}
                                        value={photos}
                                        onChange={e => setSelectedNumberOfPhotos(Number(e.target.value))}
                                        checked={photos === selectedNumberOfPhotos}
                                    />
                                    <label className="border rounded-xl py-2 px-4 flex-1"
                                           htmlFor={`number-of-photos-${photos}`}>{photos} Photos</label>
                                    {photos === selectedNumberOfPhotos &&
                                        <Check size={16} className="absolute top-1/2 right-4 -translate-y-1/2"/>}
                                </div>
                            )
                        }), [selectedNumberOfPhotos])
                    }
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