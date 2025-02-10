import { Gender, Role } from "@repo/ui/types/user.types";


export type TLoginResponse = {
    id: string;
    role: Role;
    email: string;
    fullName?: string;
    profile?: {
        id: string
    }
    tokens: {
        accessToken: string;
        refreshToken: string;
        csrfId: string;
    };
};

export type TProfile = {
    id: string;
    role: Role;
    email: string;
    newEmail?: string;
    fullName: string;
    profile: {
        fullName: string;
        phone: string;
        dob: string;
        gender: Gender;
        countryCode: string;
    }
}