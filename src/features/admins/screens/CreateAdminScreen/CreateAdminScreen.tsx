import { memo, useState } from "react";

import { Form } from "antd";
import { useNavigate } from "react-router-dom";

import AdminForm from "@/features/admins/components/AdminForm/AdminForm";
import { CreateAdminRequestBody } from "@/features/admins/types/admins.types";
import { DataError } from "@/types/api.types";
import { getMessage, handleErrorSubmitted } from "@/utils/utils";

import { AdminsPathsEnum } from "../../admins";
import useCreateAdmin from "../../hooks/useCreateAdmin";

const CreateAdminScreen = () => {
  const [form] = Form.useForm<CreateAdminRequestBody>();
  const [avatarErrorMsg, setAvatarErrorMsg] = useState<string>("");

  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createAdmin, isCreateAdminLoading } = useCreateAdmin();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCreateAdmin = (adminParams: CreateAdminRequestBody) => {
    createAdmin(adminParams)
      .then(() => navigate(AdminsPathsEnum.ADMINS))
      .catch((err: DataError) => {
        if (err.error.propertyName === "avatar") {
          setAvatarErrorMsg(getMessage(err.error.code, err.error.propertyName));
        }
        handleErrorSubmitted(form, err);
      });
  };

  // const handleOnSubmit = async (
  //   values: CreateAdminRequestBody,
  //   file?: File | null
  // ) => {
  //   if (file) {
  //     postPreSignUrl({
  //       tableName: UploadTableName.hiromoriAdmins,
  //       images: [
  //         {
  //           fileName: file?.name,
  //         },
  //       ],
  //     })
  //       .then(response => {
  //         if (response.data.images?.[0].url) {
  //           uploadFileToSever({
  //             preSignUrl: response.data.images?.[0].url,
  //             file,
  //           })
  //             .then(() => {
  //               handleCreateAdmin({
  //                 ...values,
  //                 avatar: response.data.images?.[0].imagepath,
  //               });
  //             })
  //             .catch(() =>
  //               openNotification({
  //                 message: getMessage("MSG0026"),
  //                 className: "pre-wrap",
  //               })
  //             );
  //         }
  //       })
  //       .catch(err => {
  //         openNotification({
  //           message: getMessage(err.error.code),
  //           className: "pre-wrap",
  //         });
  //       });
  //   } else {
  //     handleCreateAdmin(values);
  //   }
  // };

  return (
    <AdminForm
      onSubmit={() => console.log(123)}
      formInstance={form}
      isSubmitting={
        false
        // isCreateAdminLoading || isUpLoading || isPostPreSignUrlLoading
      }
      fieldsRequire={[
        "email",
        "nameFamily",
        "nameFirst",
        "password",
        "confirmPassword",
      ]}
      avatarErrorMsg={avatarErrorMsg}
    />
  );
};

export default memo(CreateAdminScreen);
