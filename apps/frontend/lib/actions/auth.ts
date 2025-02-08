"use server";

import { changePasswordSchema, loginSchema, profileBasicSchema, signUpSchema, TChangePassword, TLogin, TProfileBasic, TSignUp } from "@repo/ui/schemas/auth.schema";
import { createSession, deleteSession, getSession } from "./session";
import { AllowedRoles, BACKEND_URL } from "@/lib/constants";
import { ReturnType, TBaseResponse } from "@repo/ui/types/response.type";
import { API_ROUTES } from "@repo/ui/lib/routes";
import { TLoginResponse } from "@repo/ui/types/auth.response.type"
import { getQueryString } from "@repo/ui/lib/utils";
import { PrivateSubmitHandler, PublicSubmitHandler } from "./global.action";
import { revalidatePath } from "next/cache";


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
      BACKEND_URL + API_ROUTES.auth.login.endpoint,
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
          fullName: result?.data?.fullName,
          profile: result?.data?.profile
        },
        accessToken: result.data.tokens.accessToken,
        refreshToken: result.data.tokens?.refreshToken || "",
        csrfId: result.data.tokens.csrfId || ""
      });
      revalidatePath("/")
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
    ENDPOINT: API_ROUTES.auth.signUp.endpoint,
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
      BACKEND_URL + API_ROUTES.auth.signUp,
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
    ENDPOINT: API_ROUTES.auth.verifyEmail.endpoint + queryString,
    METHOD: "PATCH",
    DATA: {}
  })
}

export async function changePassword(formData: TChangePassword) {

  const validationFields = changePasswordSchema.safeParse(formData);

  if (!validationFields.success) {
    return {
      message: "Data modified",
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  return await PrivateSubmitHandler({
    ENDPOINT: API_ROUTES.user.changePassword.endpoint,
    METHOD: "PATCH",
    DATA: validationFields.data
  })
}

export async function updateProfile(formData: TProfileBasic) {

  const validationFields = profileBasicSchema.safeParse(formData);

  if (!validationFields.success) {
    return {
      message: "Data tempered",
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  return await PrivateSubmitHandler({
    ENDPOINT: API_ROUTES.profile.customer.endpoint,
    METHOD: "PATCH",
    DATA: validationFields.data
  })
}