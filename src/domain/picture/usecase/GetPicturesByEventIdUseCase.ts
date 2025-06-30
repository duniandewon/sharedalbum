import type {PictureRepository} from "@/domain/picture/repository/PictureRepository.ts";
import {PicturesRepositoryImpl} from "@/data/picture/repository/PicturesRepositoryImpl.ts";
import type {Picture} from "@/domain/picture/models/Picture.ts";

export class GetPicturesByEventIdUseCase {
    private readonly pictureRepository: PictureRepository

    constructor(pictureRepository: PictureRepository = new PicturesRepositoryImpl()) {
        this.pictureRepository = pictureRepository
    }

    async execute(eventId: string) {
        const pictures = await this.pictureRepository.getPictureByEventId(eventId)

        const tempGroup: Record<string, Picture[]> = {}

        for (const picture of pictures) {
            const dateKey = picture.createdAt.split('T')[0]

            if (!tempGroup[dateKey]) {
                tempGroup[dateKey] = []
            }

            tempGroup[dateKey].push(picture)
        }

        const finalGroup: Record<string, Picture[]> = {}

        for (const group of Object.values(tempGroup)) {
            const sortedGroup = group.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            const fullKey = sortedGroup[0].createdAt
            finalGroup[fullKey] = group
        }

        console.log(finalGroup)

        return finalGroup
    }
}