import { SubmitHandler } from "../global.action";
import { API_ROUTES } from "@repo/ui/lib/routes";
import {
  addStaffSchema,
  emailSchema,
  newUserSchema,
  profileBasicSchema,
  TAddStaffSchema,
  TEmail,
  TNewUser,
  TProfileBasic,
} from "@repo/ui/schemas/auth.schema";
import { Role } from "@repo/ui/types/user.types";

export async function submitUser(formData: TNewUser, param?: string) {
  const validationFields = newUserSchema.safeParse(formData);
  if (!validationFields.success) {
    return {
      message: "Data tempered",
    };
  }

  return await SubmitHandler({
    ENDPOINT: API_ROUTES.user.endpoint,
    METHOD: param ? "PATCH" : "POST",
    DATA: validationFields.data,
    PARAM: param,
  });
}

export async function submitStaff(formData: TAddStaffSchema) {
  const validationFields = addStaffSchema.safeParse(formData);
  if (!validationFields.success) {
    return {
      message: "Data tempered",
    };
  }

  return await SubmitHandler({
    ENDPOINT: API_ROUTES.user.newStaff.endpoint,
    METHOD: "POST",
    DATA: validationFields.data,
  });
}
export async function submitProfileBasic(
  formData: TProfileBasic,
  role: Role,
  param: string
) {
  const validationFields = profileBasicSchema.safeParse(formData);
  if (!validationFields.success) {
    return {
      message: "Data tempered",
    };
  }

  let endpoint = API_ROUTES.profile.endpoint;

  switch (role) {
    case Role.CUSTOMER:
      endpoint += "/customers";
      break;
    case Role.RIDER:
      endpoint += "/riders";
      break;
    case Role.SUPER_ADMIN:
    case Role.ADMIN:
    case Role.OPERATION_MANAGER:
    case Role.LISTING_MANAGER:
      endpoint += "/staffs";
      break;
    default:
      return {
        message: "Data tempered",
      };
  }

  return await SubmitHandler({
    ENDPOINT: endpoint,
    METHOD: "PATCH",
    DATA: validationFields.data,
    PARAM: param,
  });
}

export async function updateEmail(formData: TEmail, param: string) {
  const validationFields = emailSchema.safeParse(formData);

  if (!validationFields.success) {
    return {
      message: "Data tempered",
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  return await SubmitHandler({
    ENDPOINT: API_ROUTES.user.endpoint,
    METHOD: "PATCH",
    DATA: validationFields.data,
    PARAM: param + "/change-email",
  });
}
