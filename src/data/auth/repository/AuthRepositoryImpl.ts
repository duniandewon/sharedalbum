import type { User as FirebaseUser } from 'firebase/auth';

import type {AuthRepository} from "@/domain/auth/repository/AuthRepository.ts";
import type {User} from "@/domain/auth/model/User.ts";

import type {AuthFirebaseDataSource} from "@/data/auth/datasource/AuthFirebaseDataSource.ts";
import {AuthFirebaseDataSourceImpl} from "@/data/auth/datasource/AuthFirebaseDataSourceImpl.ts";

export class AuthRepositoryImpl implements AuthRepository {
    private readonly authDataSource: AuthFirebaseDataSource

    constructor(authDataSource: AuthFirebaseDataSource = new AuthFirebaseDataSourceImpl()) {
        this.authDataSource = authDataSource;
    }

    private mapFirebaseUserToDomain(firebaseUser: FirebaseUser | null): User | null {
        if (!firebaseUser) {
            return null;
        }

        console.log("firebaseUser:", firebaseUser)

        const creationTime = firebaseUser.metadata.creationTime || new Date().toISOString();
        const lastSignInTime = firebaseUser.metadata.lastSignInTime || new Date().toISOString();

        return {
            userId: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoUrl: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified,
            createdAt: creationTime,
            lastLoginAt: lastSignInTime,
            hostedEvents: [],
        };
    }

    onAuthStateChanged(callback: { (user: User | null): void }): { (): void } {
        return this.authDataSource.onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                const user: User = {
                    userId: firebaseUser.uid,
                    email: firebaseUser.email || "",
                    displayName: firebaseUser.displayName || "",
                    photoUrl: firebaseUser.photoURL || "",
                    emailVerified: firebaseUser.emailVerified,
                    createdAt: firebaseUser.metadata.creationTime || "",
                    lastLoginAt: firebaseUser.metadata.lastSignInTime || "",
                    hostedEvents: []
                };
                callback(user);
            } else {
                callback(null);
            }
        })
    }

    async signInWithGoogle(): Promise<User | null> {
        const userCredential = await this.authDataSource.signInWithGoogle();
        return this.mapFirebaseUserToDomain(userCredential.user)
    }

    signOut(): Promise<void> {
        return this.authDataSource.signOutUser()
    }
}