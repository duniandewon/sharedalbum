import type {AuthRepository} from "@/domain/auth/repository/AuthRepository.ts";
import {AuthRepositoryImpl} from "@/data/auth/repository/AuthRepositoryImpl.ts";

export class SignOutUseCase {
    private readonly authRepository: AuthRepository;

    constructor(authRepository: AuthRepository = new AuthRepositoryImpl()) {
        this.authRepository = authRepository;
    }

    async execute(): Promise<void> {
        return this.authRepository.signOut();
    }
}