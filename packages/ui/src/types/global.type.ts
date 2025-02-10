
export type TBreadCrumb = {
    label: string;
    link?: string;
}
type TSlug = "propertySlug" | "roomSlug" | "menuSlug" | "restaurantSlug" | "citySlug" | "cuisineSlug" | "restaurantSlug" | "orderId"

export type TParams = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
    params: Promise<Record<TSlug, string>>;
}

