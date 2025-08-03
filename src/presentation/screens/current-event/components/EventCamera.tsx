import {useEffect, useRef, useState} from "react"

import {Button, buttonVariants} from "@/presentation/components/ui/button.tsx";

import {cn} from "@/core/utils/cn.ts";
import {AppHeader} from "@/presentation/components/AppHeader.tsx";
import {SwitchCamera} from "lucide-react";

interface Props {
    remainingShot: number
    canTakePicture: boolean
    stream: MediaStream | null
    onTakePicture: (dataUrl: string) => void,
    onNavigateToAlbum: () => void
    onNavigateBack: () => void
    onSwitchCameraFacingMode: () => void
}

export function EventCamera({
                                stream,
                                onTakePicture,
                                canTakePicture,
                                remainingShot,
                                onNavigateToAlbum,
                                onNavigateBack,
                                onSwitchCameraFacingMode
                            }: Props) {
    const streamRef = useRef<HTMLVideoElement | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const [isFlashing, setIsFlashing] = useState(false)

    const handleTakePicture = () => {
        const video = streamRef.current
        const canvas = canvasRef.current
        if (!video || !canvas) return

        const context = canvas.getContext("2d")
        if (!context) return

        setIsFlashing(true)
        setTimeout(() => setIsFlashing(false), 150)

        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const dataUrl = canvas.toDataURL("image/jpeg")
        onTakePicture(dataUrl)
    }

    useEffect(() => {
        if (streamRef.current && stream) {
            streamRef.current.srcObject = stream
        }
    }, [stream])

    return (
        <div className="h-dvh w-dvw grid grid-rows-[1fr_auto] bg-accent relative">
            <div className="absolute top-0 left-0 z-50">
                <AppHeader onClickBack={onNavigateBack}/>
            </div>
            <div className="relative rounded-b-4xl overflow-hidden w-full">
                {isFlashing && (
                    <div
                        className="absolute inset-0 bg-white opacity-80 animate-fade-out pointer-events-none z-50"/>
                )}
                <div className="absolute bottom-8 inset-x-0 flex justify-end mx-8 z-50">
                    <Button variant="ghost" className="size-12 px-0 py-0" onClick={() => onSwitchCameraFacingMode()}>
                        <SwitchCamera className="size-8" size={35}/>
                    </Button>
                </div>
                <video
                    ref={streamRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover bg-black"
                />
            </div>
            <div className="grid grid-cols-3 justify-items-center items-center px-4">
                <div className="justify-self-start">
                    {remainingShot} shots left
                </div>
                <button
                    className="w-12 h-12 rounded-full bg-primary disabled:bg-primary/50"
                    onClick={handleTakePicture}
                    disabled={!canTakePicture}
                />
                <button
                    className={cn("justify-self-end", buttonVariants({variant: "default"}))}
                    onClick={onNavigateToAlbum}
                >
                    To Album
                </button>
            </div>
            <canvas ref={canvasRef} className="hidden"/>
        </div>
    )
}