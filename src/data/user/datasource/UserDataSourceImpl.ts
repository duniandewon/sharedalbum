import {Database, ref, get, set, update} from 'firebase/database';
import {firebaseDatabase} from "@/core/config/firebase.ts";
import type {UserDataSource} from "@/data/user/datasource/UserDataSource.ts";
import type {UserDto} from "@/data/user/dto/UserDto.ts";

export class UserDataSourceImpl implements UserDataSource {
    private readonly db: Database;

    constructor(firebaseDb: Database = firebaseDatabase) {
        this.db = firebaseDb
    }

    createUSer(user: UserDto): Promise<void> {
        return set(ref(this.db, `users/${user.userId}`), user)
    }

    async getUserById(id: string): Promise<UserDto | null> {
        const user = await get((ref(this.db, `users/${id}`)))
        if (user.exists()) {
            return user.val()
        }

        return null
    }

    async getUserByEmail(email: string): Promise<UserDto | null> {
        const user = await get((ref(this.db, `users/${email}`)))
        if (user.exists()) {
            return user.val()
        }

        return null
    }

    updateUser(userId: string, data: Partial<UserDto>): Promise<void> {
        return update(ref(this.db, `users/${userId}`), data);
    }
}