import type {LogInWithGoogleUseCase} from "@/domain/auth/usecase/LogInWithGoogleUseCase.ts";
import type {
    AuthStateObserverCallback,
    ObserveAuthStateUseCase, UnsubscribeFunction
} from "@/domain/auth/usecase/ObserveAuthStateUseCase.ts";
import type {User} from "@/domain/auth/model/User.ts";
import {useCallback, useEffect, useMemo, useState} from "react";
import type {SignOutUseCase} from "@/domain/auth/usecase/SignOutUseCase.ts";

export interface AuthViewModel {
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoadingAuthOp: boolean; // For active sign-in/sign-out operations
    isAuthInitialized: boolean; // True once initial auth state is checked
    authError: string | null;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthViewModelProps {
    signInWithGoogleUseCase: LogInWithGoogleUseCase;
    signOutUseCase: SignOutUseCase;
    observeAuthStateUseCase: ObserveAuthStateUseCase;
}

export function useAuth({
                            observeAuthStateUseCase,
                            signInWithGoogleUseCase,
                            signOutUseCase
                        }: AuthViewModelProps): AuthViewModel {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoadingAuthOp, setIsLoadingAuthOp] = useState<boolean>(false);
    const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false); // Tracks initial auth check
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        // console.log('AuthViewModel: Setting up auth state observer...');
        const authObserverCallback: AuthStateObserverCallback = (user) => {
            // console.log('AuthViewModel: Auth state changed, user:', user);
            setCurrentUser(user);
            if (!isAuthInitialized) {
                setIsAuthInitialized(true);
            }
        };

        const unsubscribe: UnsubscribeFunction = observeAuthStateUseCase.execute(authObserverCallback);

        // Cleanup subscription on unmount
        return () => {
            unsubscribe();
        };
    }, [observeAuthStateUseCase, isAuthInitialized]);

    const signInWithGoogle = useCallback(async () => {
        setIsLoadingAuthOp(true);
        setAuthError(null);
        await signInWithGoogleUseCase.execute();
        setIsLoadingAuthOp(false);
    }, [signInWithGoogleUseCase]);

    const signOut = useCallback(async () => {
        setIsLoadingAuthOp(true);
        setAuthError(null);

        await signOutUseCase.execute();
    }, [signOutUseCase])

    const isAuthenticated = useMemo(() => !!currentUser, [currentUser]);

    return {
        currentUser,
        authError,
        isAuthInitialized,
        isLoadingAuthOp,
        isAuthenticated,
        signInWithGoogle,
        signOut,
    }
}