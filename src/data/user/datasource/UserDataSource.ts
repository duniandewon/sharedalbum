import type {UserDto} from "@/data/user/dto/UserDto.ts";

export interface UserDataSource {
    getUserById(id: string): Promise<UserDto | null>

    getUserByEmail(email: string): Promise<UserDto | null>

    createUSer(user: UserDto): Promise<void>

    updateUser(userId: string, data: Partial<UserDto>): Promise<void>
}