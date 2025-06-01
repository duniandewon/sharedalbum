import type {AuthRepository} from "@/domain/auth/repository/AuthRepository.ts";
import {AuthRepositoryImpl} from "@/data/auth/repository/AuthRepositoryImpl.ts";
import type {User} from "@/domain/auth/model/User.ts";

export class LogInWithGoogleUseCase {
    private readonly authRepository: AuthRepository;

    constructor(authRepository: AuthRepository = new AuthRepositoryImpl()) {
        this.authRepository = authRepository;
    }

    async execute(): Promise<User | null> {
        return await this.authRepository.signInWithGoogle();
    }
}