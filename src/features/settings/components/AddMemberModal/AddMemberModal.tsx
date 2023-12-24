import { memo } from "react";

import { Input, Modal, ModalProps, Select } from "antd";
import { useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { emailRules, requiredRules } from "@/helpers/validations.helpers";
import { isInvalidForm } from "@/utils/utils";

import { MEMBER_ROLE_OPTIONS } from "../../constants/settings.constants";
import useAddMember from "../../hooks/useAddMember";

interface AddMemberModalProps extends ModalProps {
  refetchMembers: () => void;
  onCancel: () => void;
}

const AddMemberModal = ({
  refetchMembers,
  onCancel,
  ...props
}: AddMemberModalProps) => {
  const [form] = useForm();
  const { projectId } = useParams();

  const { addMember, isAddMemberLoading } = useAddMember(String(projectId));

  const handleAddMember = () => {
    addMember(form.getFieldsValue())
      .then(() => {
        openNotification({
          type: "success",
          message: "You have successfully added a new member into this project",
        });
        refetchMembers();
      })
      .catch(err => openNotification({ message: err.message }));
  };
  return (
    <Modal closable={false} footer={false} title="Add a member" {...props}>
      <Form layout="vertical" form={form}>
        <Item
          name="email"
          label="Email"
          required
          rules={[...requiredRules("email"), ...emailRules("Email")]}
        >
          <Input />
        </Item>
        <Item
          name="role"
          label="Role"
          required
          rules={[...requiredRules("user's role")]}
        >
          <Select options={MEMBER_ROLE_OPTIONS.slice(-2)} />
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
                onClick={handleAddMember}
                type="primary"
                disabled={isInvalidForm({
                  form,
                  fieldsRequire: ["email", "role"],
                  isSubmitting: isAddMemberLoading,
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

export default memo(AddMemberModal);
