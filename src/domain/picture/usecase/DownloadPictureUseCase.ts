import { PicturesRepositoryImpl } from "@/data/picture/repository/PicturesRepositoryImpl";
import type { PictureRepository } from "../repository/PictureRepository";

export class DownloadPictureUseCase {
  private readonly pictureRepository: PictureRepository;

  constructor(
    pictureRepository: PictureRepository = new PicturesRepositoryImpl()
  ) {
    this.pictureRepository = pictureRepository;
  }

  execute(imagePath: string) {
    return this.pictureRepository.downloadPicture(imagePath);
  }
}
