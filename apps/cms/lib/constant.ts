import { Role } from "@repo/ui/types/user.types";

export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

export const ALLOWED_ROLES = {
  CMS: [Role.ADMIN, Role.SUPER_ADMIN, Role.OPERATION_MANAGER, Role.RIDER],
  FRONTEND: [Role.CUSTOMER],
};
