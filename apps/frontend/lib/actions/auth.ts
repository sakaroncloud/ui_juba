"use server";

import { loginSchema, signUpSchema, TLogin, TSignUp } from "@repo/ui/schemas/auth.schema";
import { createSession, deleteSession, getSession } from "./session";
import { AllowedRoles, BACKEND_URL } from "@/lib/constants";
import { ReturnType, TBaseResponse } from "@repo/ui/types/response.type";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { TLoginResponse } from "@repo/ui/types/auth.response.type"
import { getQueryString } from "@repo/ui/lib/utils";
import { PublicSubmitHandler } from "./global.action";


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
      if (!AllowedRoles.includes(result.data.role)) {
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
      message: "Data modified",
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  return await PublicSubmitHandler({
    ENDPOINT: API_ROUTES.signUp.endpoint,
    METHOD: "POST",
    DATA: validationFields.data
  })
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
export async function verifyEmail(token: string, email: string) {

  if (!token || !email) {
    return {
      error: "Invalid token or email"
    }
  }
  const queryString = getQueryString([
    {
      key: "token",
      value: token
    }, {
      key: "email",
      value: email
    }
  ])

  return await PublicSubmitHandler({
    ENDPOINT: API_ROUTES.verifyEmail.endpoint + queryString,
    METHOD: "PATCH",
    DATA: {}
  })
}