import { memo, useEffect, useState } from "react";

import { Input, Modal, ModalProps, Typography } from "antd";
import { isEqual } from "lodash";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { USER_ID } from "@/constants/constants";
import { requiredRules } from "@/helpers/validations.helpers";
import { isInvalidForm } from "@/utils/utils";

import styles from "./CreateEditProjectModal.module.scss";
import useCreateProject from "../../hooks/useCreateProject";
import useEditProject from "../../hooks/useEditProject";
import { CreateEditProjectRequestBody } from "../../types/dashboard.types";

interface CreateEditProjectModal extends ModalProps {
  project?: CreateEditProjectRequestBody;
  refetchProjects: () => void;
  onCancel: () => void;
}

const CreateEditProjectModal = ({
  project = undefined,
  refetchProjects,
  onCancel,
  ...props
}: CreateEditProjectModal) => {
  const [form] = useForm();

  const { createProject, isCreateProjectLoading } = useCreateProject();
  const { editProject, isEditProjectLoading } = useEditProject(
    String(project?.projectId)
  );

  const [initialFormValue, setInitialFormValue] = useState();

  const handleCreateEditProject = () => {
    project
      ? editProject(form.getFieldsValue()).then(() => {
          openNotification({
            type: "success",
            message: "You have successfully updated a project",
          });
          onCancel();
          refetchProjects();
        })
      : createProject({
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

  useEffect(() => {
    project && form.setFieldValue("projectName", project.projectName);
    setInitialFormValue(form.getFieldsValue());
  }, [form, project]);

  return (
    <Modal
      onCancel={onCancel}
      destroyOnClose
      width="700px"
      closable={false}
      footer={false}
      {...props}
    >
      <div className={styles.container}>
        <Typography className="font-weight-bold font-20">
          {project ? "Update a project" : "Create a new project"}
        </Typography>
        <Form form={form} size="large" layout="vertical">
          <Item
            required
            label="Project name"
            name="projectName"
            rules={[...requiredRules("Project name")]}
          >
            <Input />
          </Item>
          <div className="mt-4 flex-justify-end">
            <Item className="mr-2">
              <Button className="bg-cancel-button" onClick={onCancel}>
                Cancel
              </Button>
            </Item>
            <Item
              shouldUpdate={(prevValues, curValues) => prevValues === curValues}
            >
              {() => (
                <Button
                  onClick={handleCreateEditProject}
                  type="primary"
                  disabled={
                    isInvalidForm({
                      form,
                      fieldsRequire: ["projectName"],
                      isSubmitting:
                        isCreateProjectLoading || isEditProjectLoading,
                    }) || isEqual(form.getFieldsValue(), initialFormValue)
                  }
                >
                  {project ? "Update" : "Create"}
                </Button>
              )}
            </Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(CreateEditProjectModal);
