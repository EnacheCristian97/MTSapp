import { Member } from "./member";
import { User } from "./user";

export interface Photo {
    id: number;
    url: string;
    isMain: boolean;
    isCover: boolean;
    title: string;
    appUserId: string;
    appUser: Member;
    created: string;
    publicId: string;
    comments: Comment[];
}
