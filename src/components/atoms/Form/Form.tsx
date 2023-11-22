import { RefObject, useCallback, useEffect } from "react";

import { usePrevious } from "ahooks";
import { Form as AntdForm } from "antd";
import { FormProps as AntdFormProps, FormInstance } from "antd/lib/form";
import _isEqual from "lodash/isEqual";

import { FormValues } from "@/types/common.types";

export type FormErrors = Record<string, string | string[]> | undefined;

export interface FormProps extends AntdFormProps {
  values?: FormValues;
  formRef?: RefObject<FormInstance>;
  children?: React.ReactNode;
  isFormSearch?: boolean;
}

const Form = ({
  values = undefined,
  children,
  formRef = undefined,
  form,
  isFormSearch,
  ...props
}: FormProps) => {
  const [formInstance] = AntdForm.useForm(form);

  const bindValues = useCallback(() => {
    formInstance.resetFields();
  }, [formInstance]);

  const prevValues = usePrevious(values);

  useEffect(() => {
    if (!_isEqual(prevValues, values)) {
      bindValues();
    }
  }, [bindValues, values, prevValues]);

  return (
    <AntdForm
      form={formInstance}
      ref={formRef}
      initialValues={values}
      validateTrigger="onBlur"
      onValuesChange={changedValues => {
        Object.entries(changedValues).forEach(([fieldName, fieldValue]) => {
          if (fieldValue === "") {
            if (["password", "confirmPassword"].includes(fieldName)) {
              formInstance.setFieldsValue({ [fieldName]: undefined });
            } else {
              formInstance.setFieldsValue({
                [fieldName]: isFormSearch ? undefined : null,
              });
            }
          }
        });
      }}
      labelWrap
      {...props}
    >
      {children}
    </AntdForm>
  );
};

export const { Item, List, useForm, Provider } = AntdForm;

export default Form;
