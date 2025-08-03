import type {UserRepository} from "@/domain/user/repository/UserRepository.ts";
import {UserRepositoryImpl} from "@/data/user/repository/UserRepositoryImpl.ts";
import type {User} from "@/domain/shared/domain/User.ts";

export class AddOrUpdateUserUseCase {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository = new UserRepositoryImpl()) {
        this.userRepository = userRepository
    }

    async execute(user: User) {
        const existingUser = await this.userRepository.getUserByEmail(user.email)

        const now = new Date().toISOString()
        if (existingUser) {
            const updateUser = {...existingUser, lastLoginAt: now}
            await this.userRepository.updateUser(user.userId, updateUser)

            return updateUser;
        }

        const newUser: User = {...user, createdAt: now, lastLoginAt: now, hostedEvents: []}

        await this.userRepository.createUser(newUser)

        return newUser;
    }
}