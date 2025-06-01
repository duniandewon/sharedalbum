import type {User} from "@/domain/auth/model/User.ts";

export interface AuthRepository {
    signInWithGoogle(): Promise<User | null>
    signOut(): Promise<void>
    onAuthStateChanged(callback: (user: User | null) => void): () => void;
}