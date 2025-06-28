import {useEffect, useRef, useState} from "react"
import {buttonVariants} from "@/presentation/components/ui/button.tsx";
import {Link} from "react-router";
import {cn} from "@/core/utils/cn.ts";

interface Props {
    remainingShot: number
    canTakePicture: boolean
    stream: MediaStream | null
    onTakePicture: (dataUrl: string) => void
}

export function EventCamera({stream, onTakePicture, canTakePicture, remainingShot}: Props) {
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
        <div className="h-screen w-screen grid grid-rows-[1fr_auto] bg-accent">
            <div className="relative rounded-b-4xl overflow-hidden">
                {isFlashing && (
                    <div
                        className="absolute inset-0 bg-white opacity-80 animate-fade-out pointer-events-none z-50"/>
                )}
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
                <Link className={cn("justify-self-end", buttonVariants({variant: "default"}))} to="album">To
                    Album
                </Link>
            </div>
            <canvas ref={canvasRef} className="hidden"/>
        </div>
    )
}