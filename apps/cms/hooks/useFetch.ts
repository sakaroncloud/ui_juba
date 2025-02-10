import { getSession } from "@/lib/actions/session";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "@/lib/constant"

type TLoadMore = {
    pageParam: number;
    endPoint: string;
    queryKey: string;
    take?: number;
    imageName?: string
};
export const useLoadMoreFetch = (options: TLoadMore) => {
    return useInfiniteQuery({
        queryKey: options.imageName ? [options.queryKey, options.imageName] : [options.queryKey],
        queryFn: async ({ pageParam = 1 }) =>
            loadMore(pageParam, options.endPoint, options.take, options.imageName),

        initialPageParam: 1,

        getNextPageParam: (lastPage) => {
            return lastPage?.meta?.hasNextPage ? lastPage?.meta?.currentPage + 1 : undefined
        }
        ,
        getPreviousPageParam: (firstPage) =>
            firstPage?.meta?.hasPreviousPage ? firstPage?.meta?.currentPage - 1 : undefined,
    });
};

export const loadMore = async (pageParam = 1, ENDPOINT: string, take = 5, imageName = "") => {
    const session = await getSession()
    try {
        const res = await fetch(BACKEND_URL + ENDPOINT + `?page=${pageParam}&take=${take}&search=${imageName}`,
            {
                headers: {
                    "Authorization": `Bearer ${session?.accessToken || ""}`
                }
            }
        );
        return await res.json();
    } catch (error) {
        return null;
    }
};



type TOption = {
    queryKey: string;
    endPoint: string;
    param?: string;
};

// ------------- from frontend --------------

export const useFetch = <T>(options: TOption) => {
    return useQuery<T | null>({
        queryKey: options.param
            ? [options.queryKey, options.param]
            : [options.queryKey],
        queryFn: async () => await getData<T>(options),
        staleTime: 60000,
    });
};

const getData = async <T>(options: TOption): Promise<T | null> => {
    const session = await getSession()

    const response = await fetch(
        BACKEND_URL + options.endPoint + (options.param ? `/${options.param}` : ""),
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
