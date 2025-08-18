import {type ChangeEvent, useRef, useState} from "react";

import {Camera} from "lucide-react";

import {Button} from "@/presentation/components/ui/button.tsx";

interface Props {
    onSelectCoverPhoto: (file: File) => void;
}

export function CoverPhoto({onSelectCoverPhoto}: Props) {
    const fileSelectorRef = useRef<HTMLInputElement>(null)
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const handleCLickFileSelector = () => fileSelectorRef.current && fileSelectorRef.current.click()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            onSelectCoverPhoto(file)
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImagePreviewUrl(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const renderSelectedImage = () => (
        <div className="h-full max-h-[32.75rem] w-[70%] rounded-md overflow-hidden" onClick={handleCLickFileSelector}>
            <img
                src={imagePreviewUrl || ""}
                alt="Selected cover"
                className="object-cover h-full w-full"
            />
        </div>
    )

    const renderImageSelector = () => (
        <>
            <Button onClick={handleCLickFileSelector}>
                <Camera/>
                Select a cover photo
            </Button>
        </>
    )

    return (
        <div className="flex justify-center items-center flex-1">
            <input
                type="file"
                className="sr-only"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleFileChange}
                ref={fileSelectorRef}
            />
            {imagePreviewUrl ? renderSelectedImage() : renderImageSelector()}
        </div>
    )
}