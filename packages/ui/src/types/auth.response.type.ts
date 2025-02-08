import { Role } from "@repo/ui/types/user.types";


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