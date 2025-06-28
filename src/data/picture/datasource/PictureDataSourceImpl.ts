import {type FirebaseStorage, ref as storageRef, uploadString, getDownloadURL, deleteObject} from 'firebase/storage';
import {Database, get, push, ref as dbRef, remove, set} from "firebase/database";

import {firebaseDatabase, firebaseStorage} from "@/core/config/firebase.ts";

import type {PictureDataSource} from "@/data/picture/datasource/PictureDataSource.ts";
import type {PictureDto} from "@/data/picture/dto/PictureDto.ts";

export class PictureDataSourceImpl implements PictureDataSource {
    private readonly db: Database;
    private readonly storage: FirebaseStorage

    constructor(firebaseDb: Database = firebaseDatabase, storage: FirebaseStorage = firebaseStorage) {
        this.db = firebaseDb
        this.storage = storage
    }

    async deletePicture(pictureId: string, eventId: string): Promise<void> {
        const pictureRef = dbRef(this.db, `pictures/${eventId}/${pictureId}`)
        const storageRefPath = `pictures/${eventId}/${pictureId}.jpg`
        const fileRef = storageRef(this.storage, storageRefPath)

        await remove(pictureRef)

        await deleteObject(fileRef)
    }

    async getPictureByEventId(eventId: string): Promise<Record<string, PictureDto>> {
        const picturesRef = dbRef(this.db, `pictures/${eventId}`)

        const snapshot = await get(picturesRef)

        if (snapshot.exists()) {
            return snapshot.val() as Record<string, PictureDto>
        }

        return {}
    }

    async uploadPicture(uploaderId: string, uploaderName: string, eventId: string, picture: string): Promise<string> {
        const picturesRef = dbRef(this.db, `pictures/${eventId}`)

        const createdAt = new Date().toISOString()

        const newPictureRef = await push(picturesRef)
        const pictureId = newPictureRef.key || ""

        const storagePath = `pictures/${eventId}/${pictureId}.jpg`
        const storageReference = storageRef(this.storage, storagePath)

        await uploadString(storageReference, picture, "data_url")
        const url = await getDownloadURL(storageReference)

        const initialMeta: PictureDto = {
            uploaderId,
            uploaderName,
            eventId,
            createdAt,
            url,
            id: pictureId
        }

        await set(newPictureRef, initialMeta)

        return url
    }
}