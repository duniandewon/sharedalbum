import type {PictureRepository} from "@/domain/picture/repository/PictureRepository.ts";
import {PicturesRepositoryImpl} from "@/data/picture/repository/PicturesRepositoryImpl.ts";

export class UploadPictureUseCase {
    private readonly pictureRepository: PictureRepository

    constructor(pictureRepository: PictureRepository = new PicturesRepositoryImpl()) {
        this.pictureRepository = pictureRepository
    }

    async execute(uploaderId: string, uploaderName: string, eventId: string, picture: string) {
        return await this.pictureRepository.uploadPicture(uploaderId, uploaderName, eventId, picture)
    }
}