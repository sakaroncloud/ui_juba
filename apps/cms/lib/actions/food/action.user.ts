import { SubmitHandler } from "../global.action";
import { API_ROUTES } from "@repo/ui/lib/routes";
import {
  addStaffSchema,
  emailSchema,
  newUserSchema,
  profileBasicSchema,
  roleChangeSchema,
  TAddStaffSchema,
  TEmail,
  TNewUser,
  TProfileBasic,
  TRoleChange,
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

type TProps = {
  param?: string; // if provided - then it will be by SUPER_ADMIN
  role: Role;
  formData: TProfileBasic;
};
export async function submitProfileBasic({ param, role, formData }: TProps) {
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

export async function updateEmail(formData: TEmail, param?: string) {
  // if param is not provided - it means user is updating their own email
  const validationFields = emailSchema.safeParse(formData);

  if (!validationFields.success) {
    return {
      message: "Data tempered",
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  let endPoint = API_ROUTES.user.endpoint;

  if (param) {
    endPoint += "/" + param + "/change-email";
  } else {
    endPoint += "/change-my-email";
  }

  return await SubmitHandler({
    ENDPOINT: endPoint,
    METHOD: "PATCH",
    DATA: validationFields.data,
  });
}

export async function updateRole(formData: TRoleChange, param: string) {
  // if param is not provided - it means user is updating their own email
  const validationFields = roleChangeSchema.safeParse(formData);

  if (!validationFields.success) {
    return {
      message: "Data tempered",
      errors: validationFields.error.flatten().fieldErrors,
    };
  }

  const endPoint = API_ROUTES.user.endpoint + "/" + param + "/change-role";

  return await SubmitHandler({
    ENDPOINT: endPoint,
    METHOD: "PATCH",
    DATA: validationFields.data,
  });
}
