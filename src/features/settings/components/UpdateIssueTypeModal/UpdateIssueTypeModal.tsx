import { memo, useEffect, useMemo, useState } from "react";

import { Input, Modal, ModalProps } from "antd";
import { ColorPicker } from "antd/lib";
import { Color, ColorPickerProps } from "antd/lib/color-picker";
import { useParams } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import Loader from "@/components/organisms/Loader/Loader";
import { openNotification } from "@/components/organisms/Notification/Notification";
import { requiredRules } from "@/helpers/validations.helpers";
import { isInvalidForm } from "@/utils/utils";

import styles from "./UpdateIssueTypeModal.module.scss";
import useGetMasterIssueType from "../../hooks/useGetMasterIssueType";
import useUpdateMasterIssueType from "../../hooks/useUpdateMasterIssueType";

interface UpdateIssueTypeModalProps extends ModalProps {
  issueTypeId: number;
  refetchIssueTypes: () => void;
  onCancel: () => void;
}

const UpdateIssueTypeModal = ({
  issueTypeId,
  refetchIssueTypes,
  onCancel,
  ...props
}: UpdateIssueTypeModalProps) => {
  const [form] = useForm();
  const { projectId } = useParams();

  const { updateIssueType, isUpdateIssueTypeLoading } =
    useUpdateMasterIssueType();
  const { isGetMasterIssueTypeLoading, masterIssueType } =
    useGetMasterIssueType(String(issueTypeId));

  const [colorHex, setColorHex] = useState<Color | string | undefined>(
    "f42858"
  );
  const [formatHex, setFormatHex] = useState<ColorPickerProps["format"]>("hex");

  const hexString = useMemo(
    () => (typeof colorHex === "string" ? colorHex : colorHex?.toHexString()),
    [colorHex]
  );

  const handleUpdateIssueType = () => {
    updateIssueType({
      ...form.getFieldsValue(),
      color: typeof colorHex === "string" ? colorHex : colorHex?.toHexString(),
      issueTypeId,
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

  useEffect(() => {
    form.setFieldsValue(masterIssueType);
    setColorHex(masterIssueType?.color);
  }, [form, masterIssueType]);

  if (isGetMasterIssueTypeLoading) return <Loader />;

  return (
    <Modal
      closable={false}
      footer={false}
      title="Editing an issue type"
      {...props}
    >
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
            format={formatHex}
            value={colorHex}
            onChange={setColorHex}
            onFormatChange={setFormatHex}
          />
          <span className="ml-1">HEX: {hexString?.toUpperCase()}</span>
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
                onClick={handleUpdateIssueType}
                type="primary"
                disabled={isInvalidForm({
                  form,
                  fieldsRequire: ["issueType"],
                  isSubmitting: isUpdateIssueTypeLoading,
                })}
              >
                Update
              </Button>
            )}
          </Item>
        </div>
      </Form>
    </Modal>
  );
};

export default memo(UpdateIssueTypeModal);
