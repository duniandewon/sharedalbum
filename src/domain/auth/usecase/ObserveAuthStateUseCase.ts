import type {AuthRepository} from "@/domain/auth/repository/AuthRepository.ts";
import {AuthRepositoryImpl} from "@/data/auth/repository/AuthRepositoryImpl.ts";
import type {User} from "@/domain/shared/domain/User.ts";

export type AuthStateObserverCallback = (user: User | null) => void;
export type UnsubscribeFunction = () => void;

export class ObserveAuthStateUseCase {
    private readonly authRepository: AuthRepository;

    constructor(authRepository: AuthRepository = new AuthRepositoryImpl()) {
        this.authRepository = authRepository;
    }

    execute(callback: AuthStateObserverCallback): UnsubscribeFunction {
        return this.authRepository.onAuthStateChanged(callback);
    }
}