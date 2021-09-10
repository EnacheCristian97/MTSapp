import { User } from "./user";

export interface Photo {
    id: number;
    url: string;
    isMain: boolean;
    title: string;
    AppUserId: string;
    AppUser: User;
}
