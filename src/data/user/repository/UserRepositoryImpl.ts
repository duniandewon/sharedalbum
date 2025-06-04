import type {UserRepository} from "@/domain/user/repository/UserRepository.ts";
import type {User} from "@/domain/shared/domain/User.ts";
import type {UserDataSource} from "@/data/user/datasource/UserDataSource.ts";
import {UserDataSourceImpl} from "@/data/user/datasource/UserDataSourceImpl.ts";

export class UserRepositoryImpl implements UserRepository {
    private readonly userDataSource: UserDataSource

    constructor(userDataSource: UserDataSource = new UserDataSourceImpl()) {
        this.userDataSource = userDataSource
    }

    createUser(user: User): Promise<void> {
        return this.userDataSource.createUSer(user)
    }

    getUserById(userId: string): Promise<User | null> {
        return this.userDataSource.getUserById(userId);
    }

    updateUser(userId: string, data: Partial<User>): Promise<void> {
        return this.userDataSource.updateUser(userId, data)
    }
}