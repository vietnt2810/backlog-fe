import { memo, useEffect, useState } from "react";

import { Input, Modal, ModalProps, Typography } from "antd";
import { isEqual } from "lodash";
import { useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";
import { requiredRules } from "@/helpers/validations.helpers";
import { isInvalidForm } from "@/utils/utils";

import styles from "./ChangeUserInformationInProjectModal.module.scss";
import useUpdateUserInProject from "../../hooks/useUpdateUserInProject";

interface ChangeUserInformationInProjectModalProps extends ModalProps {
  refetchMemberDetail: () => void;
  usernameInProject?: string;
  onCancel: () => void;
}

const ChangeUserInformationInProjectModal = ({
  refetchMemberDetail,
  usernameInProject,
  onCancel,
  ...props
}: ChangeUserInformationInProjectModalProps) => {
  const [form] = useForm();
  const { projectId } = useParams();

  const { isUpdateUserInProjectLoading, updateUserInProject } =
    useUpdateUserInProject(
      String(projectId),
      String(localStorage.getItem(USER_ID))
    );

  const [initialFormValue, setInitialFormValue] = useState();

  const handleChangeUserInformationInProject = () => {
    updateUserInProject(form.getFieldsValue())
      .then(() => {
        openNotification({
          type: "success",
          message:
            "You have successfully changed user information under this project",
        });
        setTimeout(() => {
          refetchMemberDetail();
        }, 500);
      })
      .finally(() => onCancel());
  };

  useEffect(() => {
    form.setFieldValue("memberName", usernameInProject);
    setInitialFormValue(form.getFieldsValue());
  }, [form, usernameInProject]);

  return (
    <Modal
      destroyOnClose
      width="700px"
      closable={false}
      footer={false}
      {...props}
    >
      <div className={styles.container}>
        <Typography className="font-weight-bold font-20">
          Change user information
        </Typography>
        <Form form={form} size="large" layout="vertical">
          <Item
            required
            label="Username"
            name="memberName"
            rules={[...requiredRules("Username")]}
          >
            <Input />
          </Item>
          <div className="mt-4 flex-justify-end">
            <Item className="mr-2">
              <Button className="bg-red-button" onClick={onCancel}>
                Cancel
              </Button>
            </Item>
            <Item
              shouldUpdate={(prevValues, curValues) => prevValues === curValues}
            >
              {() => (
                <Button
                  onClick={handleChangeUserInformationInProject}
                  type="primary"
                  disabled={
                    isInvalidForm({
                      form,
                      fieldsRequire: ["memberName"],
                      isSubmitting: isUpdateUserInProjectLoading,
                    }) || isEqual(form.getFieldsValue(), initialFormValue)
                  }
                >
                  Update
                </Button>
              )}
            </Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(ChangeUserInformationInProjectModal);
