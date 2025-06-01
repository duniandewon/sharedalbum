import type {Auth, NextOrObserver, User as FirebaseUser, UserCredential} from "firebase/auth";
import {
    onAuthStateChanged as firebaseOnAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import {firebaseAuth as defaultFirebaseAuth} from "@/core/config/firebase";
import type {AuthFirebaseDataSource} from "@/data/auth/datasource/AuthFirebaseDataSource.ts";

export class AuthFirebaseDataSourceImpl implements AuthFirebaseDataSource {
    private readonly authInstance: Auth;
    private readonly googleAuthProvider: GoogleAuthProvider;

    constructor(auth: Auth = defaultFirebaseAuth) {
        this.authInstance = auth;
        this.googleAuthProvider = new GoogleAuthProvider();
        this.googleAuthProvider.setCustomParameters({prompt: 'select_account'});
    }

    signInWithGoogle(): Promise<UserCredential> {
        return signInWithPopup(this.authInstance, this.googleAuthProvider)
    }

    signOutUser(): Promise<void> {
        return signOut(this.authInstance)
    }

    onAuthStateChanged(callback: NextOrObserver<FirebaseUser | null>): () => void {
        return firebaseOnAuthStateChanged(this.authInstance, callback);
    }
}