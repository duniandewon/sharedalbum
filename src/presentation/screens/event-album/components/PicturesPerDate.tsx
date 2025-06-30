import type {Picture} from "@/domain/picture/models/Picture.ts";
import {Button} from "@/presentation/components/ui/button.tsx";
import {EllipsisVertical} from "lucide-react";
import {formatDate} from "@/core/utils/formatDate.ts";

interface Props {
    date: string,
    pictures: Picture[]
}

export function PicturesPerDate({date, pictures}: Props) {
    return (
        <div className="space-y-2">
            <h2>{formatDate(new Date(date))}</h2>
            <div className="grid grid-cols-3 gap-2">
                {pictures.map(picture => (
                    <div key={picture.id} className="relative min-w-7 min-h-36 bg-primary/60">
                        <img src={picture.url} alt={picture.uploaderName} className="w-full h-full object-cover"/>
                        <p className="absolute bottom-1 left-1 text-xs">{picture.uploaderName}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 right-1"
                        >
                            <EllipsisVertical/>
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}