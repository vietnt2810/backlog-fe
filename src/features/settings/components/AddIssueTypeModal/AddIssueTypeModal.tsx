import { memo } from "react";

import { Input, Modal, ModalProps } from "antd";
import { useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import useAddIssueType from "@/features/issue/hooks/useAddIssueType";
import { requiredRules } from "@/helpers/validations.helpers";
import { isInvalidForm } from "@/utils/utils";

interface AddIssueTypeModalProps extends ModalProps {
  refetchIssueTypes: () => void;
  onCancel: () => void;
}

const AddIssueTypeModal = ({
  refetchIssueTypes,
  onCancel,
  ...props
}: AddIssueTypeModalProps) => {
  const [form] = useForm();
  const { projectId } = useParams();

  const { addIssueType, isAddIssueTypeLoading } = useAddIssueType();

  const handleAddIssueType = () => {
    addIssueType({ ...form.getFieldsValue(), projectId: String(projectId) })
      .then(() => {
        openNotification({
          type: "success",
          message: "You have successfully added a new issue type",
        });
        refetchIssueTypes();
      })
      .catch(err => openNotification({ message: err.message }));
  };
  return (
    <Modal closable={false} footer={false} title="Add an issue type" {...props}>
      <Form layout="vertical" form={form}>
        <Item
          name="issueType"
          label="Issue Type"
          required
          rules={[...requiredRules("Issue Type")]}
        >
          <Input />
        </Item>
        <div className="mt-4 flex-justify-end">
          <Item className="mr-2">
            <Button className="bg-cancel-button" onClick={onCancel}>
              Cancel
            </Button>
          </Item>
          <Item shouldUpdate>
            {() => (
              <Button
                onClick={handleAddIssueType}
                type="primary"
                disabled={isInvalidForm({
                  form,
                  fieldsRequire: ["issueType"],
                  isSubmitting: isAddIssueTypeLoading,
                })}
              >
                Create
              </Button>
            )}
          </Item>
        </div>
      </Form>
    </Modal>
  );
};

export default memo(AddIssueTypeModal);
