import { memo, useEffect, useState } from "react";

import { Input, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadFile } from "antd/es/upload/interface";
import cx from "classnames";
import { isEqual } from "lodash";

import Button from "@/components/atoms/Button/Button";
import Form, { Item } from "@/components/atoms/Form/Form";
import Loader from "@/components/organisms/Loader/Loader";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";
import DashboardHeader from "@/features/dashboard/components/DashboardHeader/DashboardHeader";
import { requiredRules } from "@/helpers/validations.helpers";
import { isInvalidForm, uploadFileToFirebase } from "@/utils/utils";

import styles from "./UserProfile.module.scss";
import useGetUser from "../../hooks/useGetUser";
import useUpdateUser from "../../hooks/useUpdateUser";

const UserProfile = () => {
  const [form] = useForm();

  const { user, isGetUserLoading, refetchUser } = useGetUser(
    String(localStorage.getItem(USER_ID))
  );
  const { isUpdateUserLoading, updateUser } = useUpdateUser();

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [initialFormValue, setInitialFormValue] = useState();
  const [isAvatarChanged, setIsAvatarChanged] = useState(false);
  const [isUploadingOntoFirebase, setIsUploadingOntoFirebase] = useState(false);

  const handleUpdateProfile = async (formValue: any) => {
    let avatarUrl;

    if (formValue.avatarUrl) {
      if (isAvatarChanged) {
        setIsUploadingOntoFirebase(true);
        avatarUrl = await uploadFileToFirebase(
          "avatars",
          formValue.avatarUrl.file.name,
          formValue.avatarUrl.file.originFileObj
        ).finally(() => setIsUploadingOntoFirebase(false));
      } else {
        avatarUrl = undefined;
      }
    } else {
      avatarUrl = null;
    }

    updateUser({
      username: formValue.username,
      email: formValue.email,
      avatarUrl,
    }).then(() => {
      openNotification({
        type: "success",
        message: "Changed user profile successfully",
      });
      refetchUser();
      setIsAvatarChanged(false);
    });
  };

  useEffect(() => {
    form.setFieldsValue(user);
    setInitialFormValue(form.getFieldsValue());
    user?.avatarUrl &&
      setFileList([
        {
          uid: "avatar",
          url: user?.avatarUrl,
          name: "avatar",
        },
      ]);
  }, [form, user]);

  return (
    <div className={cx(styles.container)}>
      <DashboardHeader subHeaderTitle="ACCOUNT" />
      {isGetUserLoading ? (
        <Loader />
      ) : (
        <div className="mainContent pb-4">
          <Form
            onFinish={handleUpdateProfile}
            className="form"
            form={form}
            size="large"
            layout="vertical"
          >
            <Item name="avatarUrl" className="flex-justify-center py-4">
              <Upload
                fileList={fileList}
                maxCount={1}
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                onChange={e => {
                  setIsAvatarChanged(true);
                  setFileList(e.fileList);
                  !e.fileList.length && form.setFieldValue("avatarUrl", null);
                }}
              >
                {fileList.length ? null : (
                  <Button className="uploadButton">Change image</Button>
                )}
              </Upload>
            </Item>
            <Item
              className="inputItem m-auto"
              name="username"
              required
              label="User Name"
              rules={[...requiredRules("username")]}
            >
              <Input />
            </Item>
            <Item className="inputItem m-auto" name="email" label="Email">
              <Input disabled />
            </Item>
            <Item
              shouldUpdate={(prevValues, curValues) => prevValues === curValues}
            >
              {() => (
                <Button
                  htmlType="submit"
                  disabled={
                    isInvalidForm({
                      form,
                      fieldsRequire: ["username"],
                      isSubmitting: isUpdateUserLoading || isGetUserLoading,
                    }) ||
                    isEqual(form.getFieldsValue(), initialFormValue) ||
                    isUploadingOntoFirebase
                  }
                  className="submitButton hoverOpacity"
                >
                  Update
                </Button>
              )}
            </Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default memo(UserProfile);
