
export const API_ROUTES = {
    // auth
    login: {
        endpoint: "/auth/login" as const,
        queryKey: "login" as const,
    },
    logout: {
        endpoint: "/auth/signout" as const,
        queryKey: "logout" as const,
    },
    verifyEmail: {
        endpoint: "/auth/email-verification" as const,
        queryKey: "verify-email" as const,
    },
    signUp: {
        endpoint: "/auth/signup" as const,
        queryKey: "signUp" as const,
    },
    // fooding
    cuisine: {
        endpoint: "/fooding/cuisines" as const,
        queryKey: "cuisine" as const,
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
    singleCuisinePage: {
        endpoint: "/fooding/cuisines/single-page" as const,
        queryKey: "singleCuisinePage" as const,
    },
    singleRestImage: {
        endpoint: "/fooding/uploads/restaurant" as const,
        queryKey: "singleRestImage" as const,
    },
    allRestImage: {
        endpoint: "/fooding/uploads" as const,
        queryKey: "allRestImage" as const,
    },



    // lodging

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

    // user and profile

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
    },

    // address
    city: {
        endpoint: "/cities" as const,
        queryKey: "city" as const,
    },

    //    Fooding Frontend
    cart: {
        endpoint: "/fooding/carts" as const,
        queryKey: "cart" as const,
    },
    cartItem: {
        endpoint: "/fooding/carts/cart-item" as const,
        queryKey: "cart-item" as const,
    },

    checkout: {
        endpoint: "/fooding/orders/checkout" as const,
        queryKey: "checkout" as const,
    },
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
