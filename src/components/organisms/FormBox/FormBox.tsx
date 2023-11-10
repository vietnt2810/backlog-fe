import { ReactNode, RefObject, useEffect } from "react";

import { Card, Col, Form as AntdForm, Row, Space, Form } from "antd";
import { FormProps as AntdFormProps, FormInstance } from "antd/lib/form";
import { isEqual } from "lodash";
import { useTranslation } from "react-i18next";

import Button from "@/components/atoms/Button/Button";
import { confirmPrompt } from "@/components/organisms/ConfirmPrompt/ConfirmPrompt";
import { FormValues } from "@/types/common.types";
import { isInvalidForm } from "@/utils/utils";

import styles from "./FormBox.module.scss";

export interface FormProps extends AntdFormProps {
  formValues?: FormValues;
  formRef?: RefObject<FormInstance>;
  formTitle?: string;
  submitButtonText?: string;
  cancelButtonText?: string;
  onCancel?: () => void;
  children: ReactNode;
  isSubmitting?: boolean;
  fieldsRequire?: string[];
  isEditImage?: boolean;
}

const FormBox = ({
  formValues = undefined,
  children,
  formRef = undefined,
  form,
  title,
  submitButtonText,
  cancelButtonText,
  onCancel,
  isSubmitting,
  fieldsRequire,
  isEditImage,
  ...props
}: FormProps) => {
  const [formInstance] = Form.useForm(form);
  const { t } = useTranslation();

  const handleCancel = () => {
    if (!isEqual(formInstance.getFieldsValue(), formValues)) {
      return confirmPrompt({
        isShowTitle: false, // TODO: confirm spec
        content: t("modal_confirm.unsaved_content"),
        onOk: () => onCancel?.(),
      });
    }
    return onCancel?.();
  };

  useEffect(() => {
    formInstance.setFieldsValue(formValues);
  }, [formInstance, formValues]);

  return (
    <Card className={styles.formCard}>
      <AntdForm
        {...props}
        form={formInstance}
        ref={formRef}
        colon={false}
        validateTrigger="onBlur"
        onValuesChange={changedValues => {
          if (changedValues?.password === "") {
            formInstance.setFieldValue("password", undefined);
          }
          if (changedValues?.confirmPassword === "") {
            formInstance.setFieldValue("confirmPassword", undefined);
          }
        }}
      >
        <Row justify="space-between">
          <Col className="font-16">{title}</Col>
          <Col>
            <Space size={30}>
              <AntdForm.Item
                shouldUpdate={(prevValues, curValues) =>
                  prevValues === curValues
                }
              >
                {() => (
                  <Button
                    className="px-6"
                    htmlType="submit"
                    type="primary"
                    disabled={
                      (isEqual(formInstance.getFieldsValue(), formValues) &&
                        !isEditImage) ||
                      isInvalidForm({
                        form: formInstance,
                        fieldsRequire,
                        isSubmitting,
                      })
                    }
                  >
                    {submitButtonText ?? t("button.create")}
                  </Button>
                )}
              </AntdForm.Item>
              <AntdForm.Item>
                <Button onClick={handleCancel} className="px-6">
                  {cancelButtonText ?? t("button.back")}
                </Button>
              </AntdForm.Item>
            </Space>
          </Col>
        </Row>

        {children}
      </AntdForm>
    </Card>
  );
};

export const { List, Item } = AntdForm;

export default FormBox;
