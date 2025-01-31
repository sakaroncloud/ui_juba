import { clsx, type ClassValue } from "clsx"
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge"
import slugify from "slugify";
import { TQueryString } from "../types/endpoints";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type DateFormatOptions = {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "short" | "long";
  hour12?: boolean;
};

export function formatDate(
  dateString: string,
  formatOptions?: DateFormatOptions
): string {
  const date = new Date(dateString);

  const defaultOptions: DateFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };

  const options = { ...defaultOptions, ...formatOptions };

  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(date);
}



/**
 * Converts a file size from bytes to a human-readable format (KB or MB).
 *
 * @param sizeInBytes - The size of the file in bytes.
 * @returns A string representing the size in KB or MB.
 */
export function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} bytes`;
  } else if (sizeInBytes < 1024 * 1024) {
    // Size in KB
    return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  } else {
    // Size in MB
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}

// ---------------- breadCrumb Generator

export const getBreadCrumb = (pathname: string) => {
  const pathItems = pathname.split("/").filter(Boolean)
  const breadCrumb = [
    { label: "Dashboard", link: "/" },
    ...pathItems.map((label, index) => {
      const removedDoubleDash = label.split("--")[0]
      const formattedLabel = removedDoubleDash?.replace(/-/g, " ");


      // Replace hyphens with spaces
      const link =
        index === pathItems.length - 1 // If it's the last label, no link
          ? null
          : "/" + pathItems.slice(0, index + 1).join("/");

      return { label: formattedLabel, link };
    })
  ]

  return breadCrumb
}


// Utility function to convert bytes to KB or MB, based on the size
export function convertFileSize(bytes: number) {
  const sizeInKB = bytes / 1024;  // Convert bytes to KB
  if (sizeInKB < 1024) {
    return sizeInKB.toFixed(2) + ' KB';  // Return in KB if less than 1MB
  } else {
    const sizeInMB = sizeInKB / 1024;  // Convert KB to MB if greater than or equal to 1MB
    return sizeInMB.toFixed(2) + ' MB';  // Return in MB
  }
}

export const generateSlug = (name: string) => {
  return slugify(name, {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: /[*+~.()'"!:@]/, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'vi',      // language code of the locale to use
    trim: true         // trim leading and trailing replacement chars, defaults to `true`
  })
}



type TSlug = {
  propertySlug?: string;
  roomSlug?: string;
  restaurantSlug?: string;
  productSlug?: string;
  menuSlug?: string;
};

export const getIDsFromSlug = (option: TSlug) => {
  /**
   * Utility function to extract IDs from a slug using a regex pattern
   */
  const extractIDs = (slug: string | undefined, pattern: RegExp): (string | undefined)[] => {
    const match = slug?.match(pattern);
    return match ? match.slice(1) : [];
  };

  /**
   * Extract IDs for Restaurant
   */
  const [restaurantId] = extractIDs(option?.restaurantSlug, /--(\d+)$/);

  /**
   * Extract IDs for Product and Menu
   */
  const [productId, productRestaurantID] = extractIDs(option?.productSlug, /P(\d+)R(\d+)/);
  const [menuId, menuRestaurantID] = extractIDs(option?.menuSlug, /M(\d+)R(\d+)/);

  /**
   * Extract IDs for Property and Room
   */
  const [propertyId] = extractIDs(option?.propertySlug, /--(\d+)$/);
  const [roomId, roomPropertyId] = extractIDs(option?.roomSlug, /R(\d+)P(\d+)/);

  /**
   * Validation for slug integrity
   */
  const isSlugTempered = (
    (productId && (!productRestaurantID || !restaurantId)) ||
    (menuId && (!menuRestaurantID || !restaurantId)) ||
    (roomId && (!roomPropertyId || !propertyId))
  );

  return {
    slugTempered: isSlugTempered,
    restaurantId,
    productId,
    menuId,
    propertyId,
    roomId
  };
};

/**
 * Function responsible to handle the toast messages
 * @param response 
 * @param onSuccess 
 */
export const handleToast = (response: { success: boolean; message: string }, onSuccess?: () => void) => {
  if (response.success) {
    toast.success(response.message)
    onSuccess?.()
  } else {
    toast.error(response.message || "Something went wrong")
  }
}

export const getQueryString = (query?: TQueryString[]): string => {
  if (!query || query.length === 0) return "";

  const params = new URLSearchParams();
  query.forEach(({ key, value }) => params.append(key as string, value as string));

  return `?${params.toString()}`;
};
