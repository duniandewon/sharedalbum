import {
  type FirebaseStorage,
  ref as storageRef,
  deleteObject,
} from "firebase/storage";

import {
  Database,
  equalTo,
  get,
  orderByChild,
  query,
  ref as dbRef,
  remove,
} from "firebase/database";

import { firebaseDatabase, firebaseStorage } from "@/core/config/firebase.ts";

import type { PictureDataSource } from "@/data/picture/datasource/PictureDataSource.ts";
import type { PictureDto } from "@/data/picture/dto/PictureDto.ts";
import type { UploadPictureDto } from "@/data/picture/dto/UploadPictureDto.ts";

import { HttpClient } from "@/infrastructure/http/http-client";
import { config } from "@/core/config/environment";

export class PictureDataSourceImpl implements PictureDataSource {
  private readonly db: Database;
  private readonly storage: FirebaseStorage;

  private readonly httpClient: HttpClient;

  constructor(
    firebaseDb: Database = firebaseDatabase,
    storage: FirebaseStorage = firebaseStorage,
    httpClient = new HttpClient(config.apiBaseUrl)
  ) {
    this.db = firebaseDb;
    this.storage = storage;
    this.httpClient = httpClient;
  }

  async deletePicture(pictureId: string, eventId: string): Promise<void> {
    const pictureRef = dbRef(this.db, `pictures/${eventId}/${pictureId}`);
    const storageRefPath = `pictures/${eventId}/${pictureId}.jpg`;
    const fileRef = storageRef(this.storage, storageRefPath);

    await remove(pictureRef);

    await deleteObject(fileRef);
  }

  async getPictureByEventId(
    eventId: string
  ): Promise<Record<string, PictureDto>> {
    const picturesRef = dbRef(this.db, `pictures/${eventId}`);

    const snapshot = await get(picturesRef);

    if (snapshot.exists()) {
      return snapshot.val() as Record<string, PictureDto>;
    }

    return {};
  }

  async uploadPicture(
    uploaderId: string,
    uploaderName: string,
    eventId: string,
    picture: string,
    filter_name = "Sage"
  ): Promise<string> {
    const response = await this.httpClient.post<PictureDto, UploadPictureDto>(
      "pictures/",
      {
        uploaderId,
        uploaderName,
        eventId,
        picture,
        filter_name,
      }
    );

    return response.url;
  }

  async getPicturesByUploaderId(
    eventId: string,
    uploaderId: string
  ): Promise<Record<string, PictureDto>> {
    const picturesRef = dbRef(this.db, `pictures/${eventId}`);
    const uploaderQuery = query(
      picturesRef,
      orderByChild("uploaderId"),
      equalTo(uploaderId)
    );

    const picturesSnapshot = await get(uploaderQuery);

    if (picturesSnapshot.exists()) return picturesSnapshot.val();

    return {};
  }
}
