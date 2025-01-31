type TOption = {
  endPoint: string;
  param?: string;
  tags: string[];
  query?: TQueryString[]
};

import { getSession } from "@/lib/actions/session";
import { BACKEND_URL } from "@/lib/constants";
import { getQueryString } from "@repo/ui/lib/utils";
import { TQueryString } from "@repo/ui/types/endpoints";

export const getData = async <T>(options: TOption): Promise<T | null> => {

  const queryString = getQueryString(options.query);

  const session = await getSession()

  console.log(BACKEND_URL + options.endPoint + (options.param ? `/${options.param + queryString}` : queryString))

  const fetchOption: RequestInit = {
    headers: {
      "Authorization": `Bearer ${session?.accessToken || ""}`
    },
    cache: 'force-cache',
    next: {
      tags: options.tags,
      revalidate: 20
    }
  }

  const optionsWithTags = options.tags ? {
    ...fetchOption,
    tags: options.tags
  } : fetchOption

  try {
    const response = await fetch(
      BACKEND_URL + options.endPoint + (options.param ? `/${options.param + queryString}` : queryString),
      optionsWithTags,
    );
    if (!response.ok) {
      return null;
    }

    return await response.json();
  }
  catch (error) {
    return null
  }
};