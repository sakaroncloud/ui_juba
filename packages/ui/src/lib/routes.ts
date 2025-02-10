export const API_ROUTES = {
  auth: {
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
    verifyNewEmail: {
      endpoint: "/auth/email-verification/new" as const,
      queryKey: "verify-email" as const,
    },
    forgotPassword: {
      endpoint: "/auth/forgot-password" as const,
      queryKey: "forgot-password" as const,
    },
    newPassword: {
      endpoint: "/auth/new-password" as const,
      queryKey: "new-password" as const,
    },
    signUp: {
      endpoint: "/auth/signup" as const,
      queryKey: "signUp" as const,
    },
    profile: {
      endpoint: "/auth/profile" as const,
      queryKey: "profile" as const,
    },
  },

  fooding: {
    cuisine: {
      endpoint: "/fooding/cuisines" as const,
      queryKey: "cuisine" as const,
      singleCuisinePage: {
        endpoint: "/fooding/cuisines/single-page" as const,
        queryKey: "singleCuisinePage" as const,
      },
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

      checkout: {
        endpoint: "/fooding/orders/checkout" as const,
        queryKey: "checkout" as const,
      },
    },

    uploads: {
      endpoint: "/fooding/uploads" as const,
      queryKey: "allRestImage" as const,
      singleRestImage: {
        endpoint: "/fooding/uploads/restaurant" as const,
        queryKey: "singleRestImage" as const,
      },
    },

    cart: {
      endpoint: "/fooding/carts" as const,
      queryKey: "cart" as const,
      cartItem: {
        endpoint: "/fooding/carts/cart-item" as const,
        queryKey: "cart-item" as const,
      },
    },
  },

  lodging: {
    property: {
      endpoint: "/lodging/properties" as const,
      queryKey: "property" as const,
    },
    room: {
      endpoint: "/lodging/rooms" as const,
      queryKey: "room" as const,
    },
    uploads: {
      endpoint: "/lodging/uploads" as const,
      queryKey: "propertyImage" as const,
      singlePropertyImage: {
        endpoint: "/lodging/uploads/properties" as const,
        queryKey: "singlePropertyImage" as const,
      },
    },
  },
  user: {
    endpoint: "/users" as const,
    queryKey: "user" as const,

    newStaff: {
      endpoint: "/users/staff" as const,
      queryKey: "staff" as const,
    },

    changePassword: {
      endpoint: "/users/change-password" as const,
      queryKey: "change-password" as const,
    },
    changeMyEmail: {
      endpoint: "/users/change-my-email" as const,
      queryKey: "change-my-email" as const,
    },
    changeEmail: {
      endpoint: "/users/change-email" as const,
      queryKey: "change-email" as const,
    },
  },
  profile: {
    endpoint: "/profile" as const,
    queryKey: "profile" as const,

    customer: {
      endpoint: "/profile/customers" as const,
      queryKey: "customer" as const,
      address: {
        endpoint: "/profile/customers/address" as const,
        queryKey: "customer-address" as const,
      },
    },
    rider: {
      endpoint: "/profile/riders" as const,
      queryKey: "rider" as const,
    },

    staff: {
      endpoint: "/profile/staffs" as const,
      queryKey: "rider" as const,
    },
  },
  city: {
    endpoint: "/cities" as const,
    queryKey: "city" as const,
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
