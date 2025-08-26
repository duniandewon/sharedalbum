import type { PictureDataSource } from "@/data/picture/datasource/PictureDataSource.ts";
import { PictureDataSourceImpl } from "@/data/picture/datasource/PictureDataSourceImpl.ts";

import type { PictureRepository } from "@/domain/picture/repository/PictureRepository.ts";
import type { Picture } from "@/domain/picture/models/Picture.ts";

export class PicturesRepositoryImpl implements PictureRepository {
  private readonly picturesDataSource: PictureDataSource;

  constructor(
    picturesDataSource: PictureDataSource = new PictureDataSourceImpl()
  ) {
    this.picturesDataSource = picturesDataSource;
  }
  
  downloadPicture(imagePath: string): Promise<Blob> {
    return this.picturesDataSource.downloadPicture(imagePath);
  }

  deletePicture(imageId: string, eventId: string): Promise<void> {
    return this.picturesDataSource.deletePicture(imageId, eventId);
  }

  async getPictureByEventId(eventId: string): Promise<Picture[]> {
    const pictures = await this.picturesDataSource.getPictureByEventId(eventId);

    return Object.values(pictures);
  }

  uploadPicture(
    uploaderId: string,
    uploaderName: string,
    eventId: string,
    picture: string
  ): Promise<string> {
    return this.picturesDataSource.uploadPicture(
      uploaderId,
      uploaderName,
      eventId,
      picture
    );
  }

  async gitPicturesByUploaderId(
    eventId: string,
    uploaderId: string
  ): Promise<Picture[]> {
    const pictures = await this.picturesDataSource.getPicturesByUploaderId(
      eventId,
      uploaderId
    );

    return Object.values(pictures);
  }
}
