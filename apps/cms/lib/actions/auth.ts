"use server";
import { loginSchema, signUpSchema, TLogin, TSignUp } from "@repo/ui/schemas/auth.schema";
import { createSession, deleteSession, getSession } from "./session";
import { ReturnType, TBaseResponse } from "@repo/ui/types/response.type";
import { ALLOWED_ROLES, BACKEND_URL } from "@/lib/constant";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { TLoginResponse } from "@repo/ui/types/auth.response.type"


export async function signIn(formData: TLogin): Promise<
    ReturnType & {
        data?: {
            accessToken?: string;
        };
    }
> {
    const validationFields = loginSchema.safeParse(formData);

    if (!validationFields.success) {
        return {
            message: "Submission failed",
            errors: validationFields.error.flatten().fieldErrors,
        };
    }
    try {

        const response = await fetch(
            BACKEND_URL + API_ROUTES.login.endpoint,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validationFields.data),
            }
        );


        const result: TBaseResponse<TLoginResponse> = await response.json();

        if (response.ok) {
            if (!ALLOWED_ROLES.CMS.includes(result.data.role)) {
                return {
                    message: "Invalid Credentials"
                }
            }
            await createSession({
                user: {
                    id: result.data.id,
                    role: result.data.role,
                    email: result.data?.email,
                    name: result?.data?.name,
                    profile: result?.data?.profile
                },
                accessToken: result.data.tokens.accessToken,
                refreshToken: result.data.tokens?.refreshToken || "",
                csrfId: result.data.tokens.csrfId || ""
            });
            return {
                success: "Login successful",
            };
        } else {
            return {
                message: result?.message || result?.message[0],
            };
        }
    }
    catch (e) {
        return {
            message: "Unexpected error occured"
        }
    }
}

export async function signUp(formData: TSignUp): Promise<ReturnType> {
    const validationFields = signUpSchema.safeParse(formData);

    if (!validationFields.success) {
        return {
            message: "Submission failed",
            errors: validationFields.error.flatten().fieldErrors,
        };
    }

    const response = await fetch(
        BACKEND_URL + API_ROUTES.signUp,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validationFields.data),
        }
    );

    const data = await response.json();
    if (response.ok) {
        return {
            success: "Sign up successful",
        };
    } else {
        return {
            message:
                response.status === 409
                    ? "The user is already existed!"
                    : data?.message || data?.message[0],
        };
    }
}


export async function logout() {
    const session = await getSession()

    if (!session?.accessToken) {
        return { error: "Unauthorized" };
    }
    try {
        await fetch(
            BACKEND_URL + API_ROUTES.signUp,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.refreshToken}`,
                },
                body: JSON.stringify({
                    csrfId: session.csrfId
                }),
            }
        );
        await deleteSession()
    }
    catch {
        await deleteSession()
    }
}