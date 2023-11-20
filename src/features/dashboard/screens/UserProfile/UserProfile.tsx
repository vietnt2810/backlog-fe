import { memo, useEffect, useState } from "react";

import { Input, Upload } from "antd";
import { useForm } from "antd/es/form/Form";
import { UploadFile } from "antd/es/upload/interface";
import cx from "classnames";

import Button from "@/components/atoms/Button/Button";
import Form, { Item } from "@/components/atoms/Form/Form";
import DashboardHeader from "@/components/layouts/DashboardHeader/DashboardHeader";
import Loader from "@/components/organisms/Loader/Loader";
import { USER_ID } from "@/constants/constants";
import { requiredRules } from "@/helpers/validations.helpers";

import styles from "./UserProfile.module.scss";
import useGetUser from "../../hooks/useGetUser";

const UserProfile = () => {
  const [form] = useForm();

  const { user, isGetUserLoading } = useGetUser(
    String(localStorage.getItem(USER_ID))
  );
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    form.setFieldsValue(user);
  }, [form, user]);

  return (
    <div className={cx(styles.container)}>
      <DashboardHeader subHeaderTitle="ACCOUNT" />
      {isGetUserLoading ? (
        <Loader />
      ) : (
        <div className="mainContent pb-4">
          <Form form={form} size="large" layout="vertical">
            <Item className="flex-justify-center py-4">
              <Upload
                fileList={fileList}
                maxCount={1}
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                onChange={e => setFileList(e.fileList)}
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
            <Item className="inputItem m-auto" name="email" label="Email">
              <Input disabled />
            </Item>
            <Item className="inputItem m-auto" name="email" label="Email">
              <Input disabled />
            </Item>
            <Item className="inputItem m-auto" name="email" label="Email">
              <Input disabled />
            </Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default memo(UserProfile);
