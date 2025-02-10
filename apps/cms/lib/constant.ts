import { Role } from "@repo/ui/types/user.types"

export const BACKEND_URL = "http://localhost:8000/api"

export const ALLOWED_ROLES = {
    CMS: [Role.ADMIN, Role.SUPER_ADMIN, Role.OPERATION_MANAGER, Role.RIDER],
    FRONTEND: [Role.CUSTOMER]
}