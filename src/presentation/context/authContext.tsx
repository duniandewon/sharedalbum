import {LogInWithGoogleUseCase} from "@/domain/auth/usecase/LogInWithGoogleUseCase.ts";
import {ObserveAuthStateUseCase} from "@/domain/auth/usecase/ObserveAuthStateUseCase.ts";
import {createContext, type ReactNode, useContext} from "react";
import {type AuthViewModel, useAuth} from "@/presentation/hooks/useAuth.ts";
import {SignOutUseCase} from "@/domain/auth/usecase/SignOutUseCase.ts";

const signInWithGoogleUseCase = new LogInWithGoogleUseCase()
const signOutUseCase = new SignOutUseCase();
const observeAuthStateUseCase = new ObserveAuthStateUseCase()

const AuthContext = createContext<AuthViewModel | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const auth = useAuth({
        signInWithGoogleUseCase,
        signOutUseCase,
        observeAuthStateUseCase,
    });
    return <AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = (): AuthViewModel => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};