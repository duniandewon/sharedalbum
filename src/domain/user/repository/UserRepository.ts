import type {User} from "@/domain/shared/domain/User.ts";

export interface UserRepository {
    getUserById(userId: string): Promise<User | null>;

    getUserByEmail(email: string): Promise<User | null>;

    createUser(user: User): Promise<void>;

    updateUser(userId: string, data: Partial<User>): Promise<void>;
}