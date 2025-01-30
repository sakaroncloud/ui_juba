import { BACKEND_URL } from "@/lib/constants";

export const getStaticData = async <T>(path: string) => {
  try {
    const res = await fetch(process.env.NEXT_FRONTEND_URL + "/api" + path, {
      cache: "no-store",
    });
    if (!res.ok) return undefined;
    const data = await res.json();
    return data as T;
  } catch (error) {
    return undefined;
  }
};

export const getData = async <T>(path: string) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
      cache: "no-store",
    });

    if (!res.ok) return undefined;
    const data = await res.json();
    return data as T;
  } catch (error) {
    return undefined;
  }
};

// ----------- for react query data

export const getDataFromRQ = async <T>(endpoint: string) => {
  try {
    const response = await fetch(BACKEND_URL + "/" + endpoint);
    if (response.ok) {
      return await response.json();
    }
    return undefined;
  } catch {
    return undefined;
  }
};
