import {useCallback, useMemo, useState} from "react";
import {cn} from "@/core/utils/cn.ts";

interface Props {
    ratings: number[]
    onRatingChange: (rating: number) => void
}

export function SquareRating({onRatingChange, ratings}: Props) {
    const [currRating, setCurrRating] = useState(ratings[0])

    const handleClickRating = useCallback((rating: number) => {
        setCurrRating(rating)
        onRatingChange(rating)
    }, [onRatingChange])

    const selectedRatingIndex = useMemo(() => ratings.indexOf(currRating), [currRating, ratings])

    return (
        <div className="flex w-full rounded-xl overflow-hidden border-2 border-primary">
            {
                useMemo(() => ratings.map((value, index) => {
                    const isActive = index <= selectedRatingIndex
                    return (
                        <div
                            key={value}
                            onClick={() => handleClickRating(value)}
                            className={cn("flex-1 flex items-center justify-center cursor-pointer transition-colors duration-300 py-4  not-last:border-r-2 border-gray-300", isActive ? 'bg-yellow-600' : 'hover:bg-gray-300')}
                        />
                    )
                }), [handleClickRating, ratings, selectedRatingIndex])
            }
        </div>
    )

}