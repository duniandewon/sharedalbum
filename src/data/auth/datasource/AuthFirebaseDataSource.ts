import type {NextOrObserver, User, UserCredential} from 'firebase/auth'

export interface AuthFirebaseDataSource {
    signInWithGoogle(): Promise<UserCredential>
    signOutUser(): Promise<void>
    onAuthStateChanged(callback: NextOrObserver<User | null>): () => void
}