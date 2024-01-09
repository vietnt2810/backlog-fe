import { memo, useEffect } from "react";

import { Input, Modal, ModalProps, Typography } from "antd";
import { useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { requiredRules } from "@/helpers/validations.helpers";
import { isInvalidForm } from "@/utils/utils";

import styles from "./CreateEditSubProjectModal.module.scss";
import useCreateSubProject from "../../hooks/useCreateSubProject";
import useUpdateSubProject from "../../hooks/useUpdateSubProject";
import { SubProject } from "../../types/project.types";

interface CreateEditSubProjectModalProps extends ModalProps {
  subProject?: SubProject;
  refetchSubProjects: () => void;
  onCancel: () => void;
}

const CreateEditSubProjectModal = ({
  subProject = undefined,
  refetchSubProjects,
  onCancel,
  ...props
}: CreateEditSubProjectModalProps) => {
  const [form] = useForm();
  const { projectId } = useParams();

  const { createSubProject, isCreateSubProjectLoading } = useCreateSubProject(
    String(projectId)
  );
  const { isUpdateSubProjectLoading, updateSubProject } = useUpdateSubProject(
    String(subProject?.id)
  );

  const handleCreateEditSubProject = () => {
    !subProject
      ? createSubProject(form.getFieldsValue())
          .then(() => {
            openNotification({
              type: "success",
              message: "You have successfully created a sub project",
            });
            refetchSubProjects();
          })
          .finally(() => onCancel())
      : updateSubProject(form.getFieldsValue())
          .then(() => {
            openNotification({
              type: "success",
              message: "You have successfully updated a sub project",
            });
            setTimeout(() => {
              refetchSubProjects();
            }, 300);
          })
          .finally(() => onCancel());
  };

  useEffect(() => {
    subProject &&
      form.setFieldsValue({
        subProjectName: subProject?.subProjectName,
        subTitle: subProject?.subTitle,
      });
  }, [form, subProject]);

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
          {subProject ? "Edit a Sub Project" : "Create a new Sub Project"}
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
              <Button className="bg-cancel-button" onClick={onCancel}>
                Cancel
              </Button>
            </Item>
            <Item
              shouldUpdate={(prevValues, curValues) => prevValues === curValues}
            >
              {() => (
                <Button
                  onClick={handleCreateEditSubProject}
                  type="primary"
                  disabled={isInvalidForm({
                    form,
                    fieldsRequire: ["subProjectName", "subTitle"],
                    isSubmitting:
                      isCreateSubProjectLoading || isUpdateSubProjectLoading,
                  })}
                >
                  {subProject ? "Edit" : "Create"}
                </Button>
              )}
            </Item>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(CreateEditSubProjectModal);
