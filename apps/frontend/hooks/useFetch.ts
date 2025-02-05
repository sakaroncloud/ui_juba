import { getSession } from "@/lib/actions/session";
import { BACKEND_URL } from "@/lib/constants";
import { getQueryString } from "@repo/ui/lib/utils";
import { TQueryString } from "@repo/ui/types/endpoints";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";


type TLoadMore = {
  pageParam: number;
  endPoint: string;
  queryKey: string;
  take?: number;
  query?: {
    key: string,
    value: string
  }[];
};
export const useLoadMoreFetch = (options: TLoadMore) => {
  return useInfiniteQuery({
    queryKey: [
      options.queryKey,
      ...(options.query ? options.query.map(q => `${q.key}=${q.value}`) : [])
    ],
    queryFn: async ({ pageParam = 1 }) =>
      loadMore(pageParam, options.endPoint, options.take, options.query),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage?.meta?.hasNextPage ? lastPage?.meta?.currentPage + 1 : undefined,

    getPreviousPageParam: (firstPage) =>
      firstPage?.meta?.hasPreviousPage ? firstPage?.meta?.currentPage - 1 : undefined,
  });
};

export const loadMore = async (
  pageParam = 1,
  ENDPOINT: string,
  take = 5,
  query: { key: string; value: string }[] = []
) => {
  const session = await getSession();
  query.push({
    key: "page",
    value: pageParam.toString()
  }, {
    key: "take",
    value: take.toString()
  })

  const queryString = getQueryString(query);


  try {
    const response = await fetch(
      BACKEND_URL + ENDPOINT + `/?${queryString}`,
      {
        headers: {
          "Authorization": `Bearer ${session?.accessToken || ""}`
        }
      }
    );

    return await response.json();
  } catch (error) {
    return null;
  }
};




type TOption = {
  queryKey: string;
  endPoint: string;
  param?: string;
  query?: TQueryString[]
};

// ------------- from frontend --------------

export const useFetch = <T>(options: TOption) => {
  return useQuery<T | null>({
    queryKey: [
      options.queryKey,
      ...(options.param ? [options.param] : []),
      ...(options.query ? options.query.map(q => `${q.key}=${q.value}`) : [])
    ],
    queryFn: async () => await getData<T>(options),
    staleTime: 60000,
  });
};


const getData = async <T>(options: TOption): Promise<T | null> => {
  const session = await getSession()
  const queryString = getQueryString(options.query);

  const response = await fetch(
    BACKEND_URL + options.endPoint + (options.param ? `/${options.param + queryString}` : queryString),
    {
      headers: {
        "Authorization": `Bearer ${session?.accessToken || ""}`
      }
    }
  );
  if (!response.ok) {
    return null;
  }
  return await response.json();
};
