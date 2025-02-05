"use server";

import { jwtVerify, SignJWT } from "jose";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getData } from "@/app/data";
import { revalidatePath } from "next/cache";
import { Role } from "@repo/ui/types/user.types";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";
import { JUBA_CMS_SESSION_KEY } from "@repo/ui/lib/constants";

export type Session = {
  user: {
    id: string;
    role: Role;
    email: string;
    name?: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      id?: string;
    }
  };

  accessToken: string;
  refreshToken: string;
  csrfId: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  cookieStore.set(JUBA_CMS_SESSION_KEY, session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
  revalidatePath("/")
}

export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(JUBA_CMS_SESSION_KEY)?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });


    return payload as Session;
  } catch (err) {
    redirect("/auth/sigin");
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(JUBA_CMS_SESSION_KEY);
}

export async function updateTokens({
  accessToken,
  refreshToken,
  csrfId
}: {
  accessToken: string;
  refreshToken: string;
  csrfId: string;
}) {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(JUBA_CMS_SESSION_KEY)?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) return { message: "Unauthorized" };

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
    csrfId
  };

  await createSession(newPayload);
}


export async function updateSessionWhenProfileModified() {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(JUBA_CMS_SESSION_KEY)?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) return { message: "Unauthorized" };

  const result = await getData<ResponseWithNoMeta<{
    id: string,
    email: string,
    role: Role,
    name: string,
    profile?: {
      id: string
    }
  }>>({
    endPoint: "/auth/profile",
    tags: ["users", payload.user.id]
  });

  const newPayload: Session = {
    user: {
      ...payload.user,
      name: result?.data?.name,
      profile: result?.data?.profile
    },
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    csrfId: payload.csrfId
  };

  await createSession(newPayload);

}