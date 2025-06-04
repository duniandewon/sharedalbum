import {createContext, type ReactNode, useContext} from "react";

import {LogInWithGoogleUseCase} from "@/domain/auth/usecase/LogInWithGoogleUseCase.ts";
import {ObserveAuthStateUseCase} from "@/domain/auth/usecase/ObserveAuthStateUseCase.ts";
import {SignOutUseCase} from "@/domain/auth/usecase/SignOutUseCase.ts";

import {AddOrUpdateUserUseCase} from "@/domain/user/usecase/AddOrUpdateUserUseCase.ts";

import {type IUseAuth, useAuth} from "@/presentation/hooks/useAuth.ts";

const signInWithGoogleUseCase = new LogInWithGoogleUseCase()
const signOutUseCase = new SignOutUseCase();
const observeAuthStateUseCase = new ObserveAuthStateUseCase()
const addOrUpdateUserUseCase = new AddOrUpdateUserUseCase()

const AuthContext = createContext<IUseAuth | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const auth = useAuth({
        signInWithGoogleUseCase,
        signOutUseCase,
        observeAuthStateUseCase,
        addOrUpdateUserUseCase
    });
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = (): IUseAuth => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};