import {useCallback, useEffect, useMemo, useState} from "react";
import type {LogInWithGoogleUseCase} from "@/domain/auth/usecase/LogInWithGoogleUseCase.ts";
import type {
    AuthStateObserverCallback, ObserveAuthStateUseCase, UnsubscribeFunction
} from "@/domain/auth/usecase/ObserveAuthStateUseCase.ts";
import type {User} from "@/domain/shared/domain/User.ts";
import type {SignOutUseCase} from "@/domain/auth/usecase/SignOutUseCase.ts";
import type {AddOrUpdateUserUseCase} from "@/domain/user/usecase/AddOrUpdateUserUseCase.ts";

export interface IUseAuth {
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoadingAuthOp: boolean; // For active sign-in/sign-out operations
    isAuthInitialized: boolean; // True once the initial auth state is checked
    authError: string | null;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

interface Props {
    signInWithGoogleUseCase: LogInWithGoogleUseCase;
    signOutUseCase: SignOutUseCase;
    observeAuthStateUseCase: ObserveAuthStateUseCase;
    addOrUpdateUserUseCase: AddOrUpdateUserUseCase
}

export function useAuth(
    {
        observeAuthStateUseCase,
        signInWithGoogleUseCase,
        signOutUseCase,
        addOrUpdateUserUseCase
    }: Props): IUseAuth {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoadingAuthOp, setIsLoadingAuthOp] = useState<boolean>(false);
    const [isAuthInitialized, setIsAuthInitialized] = useState<boolean>(false); // Tracks initial auth check
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        const authObserverCallback: AuthStateObserverCallback = (user) => {
            setCurrentUser(user);
            if (!isAuthInitialized) {
                setIsAuthInitialized(true);
            }
        };

        const unsubscribe: UnsubscribeFunction = observeAuthStateUseCase.execute(authObserverCallback);

        return () => {
            unsubscribe();
        };
    }, [observeAuthStateUseCase, isAuthInitialized]);

    const signInWithGoogle = useCallback(async () => {
        setIsLoadingAuthOp(true);
        setAuthError(null);
        const signedInUser = await signInWithGoogleUseCase.execute();
        if (signedInUser) {
            const userDb = await addOrUpdateUserUseCase.execute(signedInUser)
            setCurrentUser(userDb)
        }
        setIsLoadingAuthOp(false);
    }, [addOrUpdateUserUseCase, signInWithGoogleUseCase]);

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