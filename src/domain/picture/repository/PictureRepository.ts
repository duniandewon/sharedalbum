import type {Picture} from "@/domain/picture/models/Picture.ts";

export interface PictureRepository {
    uploadPicture(uploaderId: string, uploaderName: string, eventId: string, picture: string): Promise<string>

    getPictureByEventId(eventId: string): Promise<Picture[]>

    gitPicturesByUploaderId(eventId: string, uploaderId: string): Promise<Picture[]>

    deletePicture(imageId: string, eventId: string): Promise<void>
}