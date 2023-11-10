import { SystemInformationResponse } from "@/types/api.types";

import { AdminDetail, CreateAdminRequestBody } from "../admins";

export const adminInitialValue: CreateAdminRequestBody = {
  email: "",
  nameFamily: "",
  nameFirst: "",
  password: undefined,
  confirmPassword: undefined,
  filePath: "",
};

export const convertAdminInitialValue = (
  admin: AdminDetail & SystemInformationResponse
) => ({
  id: admin.id,
  email: admin.email,
  nameFamily: admin.nameFamily,
  nameFirst: admin.nameFirst,
  filePath: admin.avatarInfo?.filePath,
});
