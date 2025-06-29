import type {PictureDto} from "@/data/picture/dto/PictureDto.ts";

export interface PictureDataSource {
    uploadPicture(uploaderId: string, uploaderName: string, eventId: string, picture: string): Promise<string>

    getPictureByEventId(eventId: string): Promise<Record<string, PictureDto>>

    getPicturesByUploaderId(eventId: string, uploaderId: string): Promise<Record<string, PictureDto>>

    deletePicture(pictureId: string, eventId: string): Promise<void>
}