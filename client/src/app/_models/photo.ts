import { Member } from "./member";
import { User } from "./user";

export interface Photo {
    id: number;
    url: string;
    isMain: boolean;
    title: string;
    appUserId: string;
    appUser: Member;
}
