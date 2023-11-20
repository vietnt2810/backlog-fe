import { FormInstance } from "antd";
import dayjs from "dayjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { t } from "i18next";

import { openNotification } from "@/components/organisms/Notification/Notification";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_ID,
} from "@/constants/constants";
import { storage } from "@/firebase/config";
import { DataError } from "@/types/api.types";

export const getMessage = (
  msgCode: string,
  field1 = "",
  field2 = "",
  field3 = ""
) => {
  return t(msgCode, { ns: "message" })
    .replaceAll("{0}", field1)
    .replaceAll("{1}", field2)
    .replaceAll("{2}", field3);
};

export const isInvalidForm = ({
  form,
  fieldsRequire,
  isSubmitting,
}: {
  form: FormInstance;
  fieldsRequire?: string[];
  isSubmitting?: boolean;
}) => {
  if (isSubmitting) return true;
  return (
    (fieldsRequire
      ? Object.values(form.getFieldsValue(fieldsRequire)).some(item => !item)
      : false) ||
    !!form.getFieldsError().filter(({ errors }) => errors.length).length
  );
};

export const handleErrorSubmitted = (
  form: FormInstance,
  errorData: DataError
) => {
  const propertyName = errorData?.error?.propertyName;
  const code = errorData?.error?.code;
  if (propertyName) {
    return form.setFields([
      {
        name: propertyName,
        errors: [getMessage(code, propertyName)],
      },
    ]);
  }

  return (
    code &&
    openNotification({
      message: getMessage(code),
    })
  );
};

export const handleClearLocalStorage = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID);
};

export const getCurrentDate = () => {
  const date = dayjs();
  return date.format("dddd, MMMM D[th]");
};

export const uploadFileToFirebase = async (
  folderName: string,
  fileName: string,
  file: File
) => {
  const imageRef = ref(storage, `${folderName}/${fileName}`);

  const { metadata } = await uploadBytes(imageRef, file);

  const fileUrl = await getDownloadURL(ref(storage, metadata.fullPath));

  return { fileUrl };
};
