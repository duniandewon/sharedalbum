import type {PictureRepository} from "@/domain/picture/repository/PictureRepository.ts";
import {PicturesRepositoryImpl} from "@/data/picture/repository/PicturesRepositoryImpl.ts";

export class GetPicturesByUploaderIdUseCase {
    private readonly pictureRepository: PictureRepository

    constructor(pictureRepository: PictureRepository = new PicturesRepositoryImpl()) {
        this.pictureRepository = pictureRepository
    }

    execute(eventId: string, uploaderId: string) {
        return this.pictureRepository.gitPicturesByUploaderId(eventId, uploaderId)
    }
}