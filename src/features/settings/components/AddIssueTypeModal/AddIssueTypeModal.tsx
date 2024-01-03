import { memo, useMemo, useState } from "react";

import { Input, Modal, ModalProps } from "antd";
import { ColorPicker } from "antd/lib";
import { Color, ColorPickerProps } from "antd/lib/color-picker";
import { useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { openNotification } from "@/components/organisms/Notification/Notification";
import useAddIssueType from "@/features/issue/hooks/useAddIssueType";
import { requiredRules } from "@/helpers/validations.helpers";
import { isInvalidForm } from "@/utils/utils";

import styles from "./AddIssueTypeModal.module.scss";

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

  const [colorHex, setColorHex] = useState<Color | string>("#f42858");
  const [formatHex, setFormatHex] = useState<ColorPickerProps["format"]>("hex");

  const hexString = useMemo(
    () => (typeof colorHex === "string" ? colorHex : colorHex.toHexString()),
    [colorHex]
  );

  const handleAddIssueType = () => {
    addIssueType({
      ...form.getFieldsValue(),
      color: typeof colorHex === "string" ? colorHex : colorHex.toHexString(),
      projectId: String(projectId),
    })
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
        <Item
          name="color"
          label="Pick a color for this type"
          className={styles.formItem}
          required
        >
          <ColorPicker
            defaultValue="#f42858"
            format={formatHex}
            value={colorHex}
            onChange={setColorHex}
            onFormatChange={setFormatHex}
          />
          <span className="ml-1">HEX: {hexString.toUpperCase()}</span>
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
