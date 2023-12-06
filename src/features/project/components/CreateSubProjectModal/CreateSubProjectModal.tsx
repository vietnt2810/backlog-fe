import { memo } from "react";

import { Input, Modal, ModalProps, Typography } from "antd";
import { useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { requiredRules } from "@/helpers/validations.helpers";
import { isInvalidForm } from "@/utils/utils";

import styles from "./CreateSubProjectModal.module.scss";
import useCreateSubProject from "../../hooks/useCreateSubProject";

interface CreateSubProjectModalProps extends ModalProps {
  refetchSubProjects: () => void;
  onCancel: () => void;
}

const CreateSubProjectModal = ({
  refetchSubProjects,
  onCancel,
  ...props
}: CreateSubProjectModalProps) => {
  const [form] = useForm();
  const { projectId } = useParams();

  const { createSubProject, isCreateSubProjectLoading } = useCreateSubProject(
    String(projectId)
  );

  const handleCreateSubProject = () => {
    createSubProject(form.getFieldsValue())
      .then(() => {
        openNotification({
          type: "success",
          message: "You have successfully created a sub project",
        });
        refetchSubProjects();
      })
      .finally(() => onCancel());
  };

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
          Create a new Sub Project
        </Typography>
        <Form form={form} size="large" layout="vertical">
          <Item
            required
            label="Sub Project Name"
            name="subProjectName"
            rules={[...requiredRules("Sub Project Name")]}
          >
            <Input />
          </Item>
          <Item
            required
            label="Sub Title"
            name="subTitle"
            rules={[...requiredRules("Sub Title")]}
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
                  onClick={handleCreateSubProject}
                  type="primary"
                  disabled={isInvalidForm({
                    form,
                    fieldsRequire: ["subProjectName", "subTitle"],
                    isSubmitting: isCreateSubProjectLoading,
                  })}
                >
                  Create
                </Button>
              )}
            </Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(CreateSubProjectModal);
