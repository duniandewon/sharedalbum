import type {UserRepository} from "@/domain/user/repository/UserRepository.ts";
import {UserRepositoryImpl} from "@/data/user/repository/UserRepositoryImpl.ts";
import type {User} from "@/domain/shared/domain/User.ts";

export class GetUserUseCase {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository = new UserRepositoryImpl()) {
        this.userRepository = userRepository
    }

    async execute(userId: string): Promise<User | null> {
        return await this.userRepository.getUserById(userId)
    }
}