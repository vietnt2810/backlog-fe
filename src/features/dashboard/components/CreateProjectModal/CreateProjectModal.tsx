import { memo } from "react";

import { Input, Modal, ModalProps, Typography } from "antd";

import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";

import styles from "./CreateProjectModal.module.scss";
import useCreateProject from "../../hooks/useCreateProject";

interface CreateProjectModal extends ModalProps {
  refetchProjects: () => void;
  onCancel: () => void;
}

const CreateProjectModal = ({
  refetchProjects,
  onCancel,
  ...props
}: CreateProjectModal) => {
  const [form] = useForm();
  const { createProject, isCreateProjectLoading } = useCreateProject();

  const handleCreateProject = () => {
    createProject({
      ...form.getFieldsValue(),
      userId: String(localStorage.getItem(USER_ID)),
    }).then(() => {
      openNotification({
        type: "success",
        message: "You have successfully created a new project",
      });
      onCancel();
      refetchProjects();
    });
  };

  return (
    <Modal
      onCancel={onCancel}
      onOk={handleCreateProject}
      okText="Create"
      destroyOnClose
      width="700px"
      closable={false}
      okButtonProps={{ disabled: isCreateProjectLoading }}
      {...props}
    >
      <div className={styles.container}>
        <Typography className="text-black font-weight-bold">
          Create a new project
        </Typography>
        <Form form={form} size="large" layout="vertical">
          <Item className="formItem" label="Project name" name="projectName">
            <Input />
          </Item>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(CreateProjectModal);
