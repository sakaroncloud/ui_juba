"use server";

import { jwtVerify, SignJWT } from "jose";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getData } from "@/app/data";
import { revalidatePath } from "next/cache";
import { Role, User } from "@repo/ui/types/user.types";
import { ResponseWithNoMeta } from "@repo/ui/types/response.type";
import { JUBA_CMS_SESSION_KEY } from "@repo/ui/lib/constants";
import { API_ROUTES } from "@repo/ui/lib/routes";

export type Session = {
  user: {
    id: string;
    role: Role;
    email: string;
    fullName?: string;
    profile?: {
      fullName?: string;
      id?: string;
    };
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
  revalidatePath("/");
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
  csrfId,
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
    csrfId,
  };

  await createSession(newPayload);
}

export async function updateSessionWhenProfileModified() {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(JUBA_CMS_SESSION_KEY)?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);

  if (!payload) return { message: "Unauthorized" };

  let endPoint = API_ROUTES.profile.endpoint;

  switch (payload.user.role) {
    case Role.CUSTOMER:
      endPoint += "/customers/me";
      break;
    case Role.RIDER:
      endPoint += "/riders/me";
      break;
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
    case Role.OPERATION_MANAGER:
    case Role.LISTING_MANAGER:
      endPoint += "/staffs/me";
      break;
  }

  const result = await getData<ResponseWithNoMeta<User.TProfileWithUser>>({
    endPoint: endPoint,
    tags: [payload.user.role, payload.user.id],
  });

  const data = result?.data;

  if (data) {
    const newPayload: Session = {
      user: {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        fullName: data.fullName,
        profile: {
          fullName: data.fullName,
          id: data.id,
        },
      },
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      csrfId: payload.csrfId,
    };

    await createSession(newPayload);
  }
}
