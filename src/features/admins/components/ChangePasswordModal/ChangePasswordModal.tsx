import { memo, RefObject } from "react";

import { Form, Input, Modal } from "antd";
import { FormInstance, FormProps } from "antd/lib/form/Form";
import cx from "classnames";
import { useTranslation } from "react-i18next";

import Button from "@/components/atoms/Button/Button";
import {
  confirmPassword,
  passwordRules,
  requiredRules,
} from "@/helpers/validations.helpers";
import { FormValues } from "@/types/common.types";
import { isInvalidForm } from "@/utils/utils";

import styles from "./ChangePasswordModal.module.scss";

export interface ChangePasswordModalProps extends FormProps {
  formValues?: FormValues;
  formRef?: RefObject<FormInstance>;
  isOpen: boolean;
  isSubmitting?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const ChangePasswordModal = ({
  isOpen,
  onCancel,
  form,
  isSubmitting,
  formRef,
  ...props
}: ChangePasswordModalProps) => {
  const { t } = useTranslation("admin");

  const [formInstance] = Form.useForm(form);

  return (
    <Modal
      className={cx(styles.root)}
      title={t("modal.title")}
      open={isOpen}
      onCancel={onCancel}
    >
      <Form
        {...props}
        form={formInstance}
        ref={formRef}
        colon={false}
        labelCol={{ span: 7 }}
        labelAlign="left"
        wrapperCol={{ span: 10 }}
        validateTrigger="onBlur"
      >
        <Form.Item
          name="password"
          label={t("modal.new_password")}
          rules={[...passwordRules(), ...requiredRules(t("form.password"))]}
          validateFirst
        >
          <Input
            placeholder={t("modal.new_password")}
            maxLength={32}
            minLength={8}
            type="password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={t("modal.confirm_new_password")}
          rules={[
            ...confirmPassword("password"),
            ...requiredRules(t("form.confirm_password")),
          ]}
          dependencies={["password"]}
          validateFirst
        >
          <Input
            placeholder={t("modal.confirm_new_password")}
            maxLength={32}
            minLength={8}
            type="password"
          />
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, curValues) => prevValues === curValues}
          className="btn_update_password"
        >
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={isInvalidForm({
                form: formInstance,
                fieldsRequire: ["password", "confirmPassword"],
                isSubmitting,
              })}
            >
              {t("button.update_password")}
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default memo(ChangePasswordModal);
