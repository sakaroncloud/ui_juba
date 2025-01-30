
export const API_ROUTES = {
    login: {
        endpoint: "/auth/login" as const,
        queryKey: "login" as const,
    },
    logout: {
        endpoint: "/auth/signout" as const,
        queryKey: "logout" as const,
    },
    signUp: {
        endpoint: "/auth/signup" as const,
        queryKey: "signUp" as const,
    },
    cuisine: {
        endpoint: "/fooding/cuisines" as const,
        queryKey: "cuisine" as const,
    },
    city: {
        endpoint: "/cities" as const,
        queryKey: "city" as const,
    },
    product: {
        endpoint: "/fooding/products" as const,
        queryKey: "product-" as const,
    },
    menu: {
        endpoint: "/fooding/menus" as const,
        queryKey: "menu-" as const,
    },
    restaurant: {
        endpoint: "/fooding/restaurants" as const,
        queryKey: "restaurant" as const,
    },
    order: {
        endpoint: "/fooding/orders" as const,
        queryKey: "order" as const,
    },
    singleCusineRestaurants: {
        endpoint: "/fooding/restaurants/cuisines" as const,
        queryKey: "singleCusineRestaurants" as const,
    },
    singleRestImage: {
        endpoint: "/fooding/uploads/restaurant" as const,
        queryKey: "singleRestImage" as const,
    },
    allRestImage: {
        endpoint: "/fooding/uploads" as const,
        queryKey: "allRestImage" as const,
    },
    propertyImage: {
        endpoint: "/lodging/uploads/properties" as const,
        queryKey: "propertyImage" as const,
    },
    property: {
        endpoint: "/lodging/properties" as const,
        queryKey: "property" as const,
    },
    room: {
        endpoint: "/lodging/rooms" as const,
        queryKey: "room" as const,
    },
    user: {
        endpoint: "/users" as const,
        queryKey: "user" as const,
    },
    profile: {
        endpoint: "/profile" as const,
        queryKey: "profile" as const,
    },
    rider: {
        endpoint: "/profile/riders" as const,
        queryKey: "rider" as const,
    }
};


/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

/**
 * An array of routes tha are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */

/**
 * The prefix for API authenticcation routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string[]}
 *
 */

/**
 * The default redirect path after logging out
 * @type {string[]}
 *
 */

export const authRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/reset-password",
];

export const DEFAULT_LOGIN_REDIRECT = "/";

export const LOGGED_OUT_REDIRECT = "/auth/login";
