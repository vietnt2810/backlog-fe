import { memo, useEffect } from "react";

import { Form, Input, Typography } from "antd";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import { confirmPassword, requiredRules } from "@/helpers/validations.helpers";
import { passwordRules } from "@/helpers/validations.helpers";
import { handleErrorSubmitted, isInvalidForm } from "@/utils/utils";

import styles from "./ConfirmForgotPasswordScreen.module.scss";
import { EMAIL_STORAGE_KEY } from "../../constants/auth.constants";
import { AuthPathsEnum } from "../../constants/auth.paths";
import { codeRules } from "../../helpers/validates.helpers";
import useConfirmForgotPassword from "../../hooks/useConfirmForgotPassword";
import { ConfirmForgotPasswordRequestBody } from "../../types/auth.types";

const ConfirmForgotPasswordScreen = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const { postConfirmForgotPassword, isConfirmForgotPasswordLoading } =
    useConfirmForgotPassword();
  const [form] = Form.useForm<ConfirmForgotPasswordRequestBody>();

  const onSubmit = (data: ConfirmForgotPasswordRequestBody) => {
    const email = localStorage.getItem(EMAIL_STORAGE_KEY) as string;

    postConfirmForgotPassword({ ...data, email })
      .then(() => navigate(AuthPathsEnum.FORGOT_PASSWORD_SUCCESS))
      .catch(error => {
        const { code } = error.error;
        if (code === "MSG0004") {
          navigate(AuthPathsEnum.FORGOT_PASSWORD);
        }
        handleErrorSubmitted(form, error);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem(EMAIL_STORAGE_KEY)) {
      navigate(AuthPathsEnum.FORGOT_PASSWORD);
    }
  }, [navigate]);

  return (
    <div className={styles.root}>
      <div
        className={cx(
          styles.textLogo,
          "font-19 text-dark-10 font-weight-medium"
        )}
      >
        SWAG CONCIERGE
      </div>
      <Typography.Title level={3} className="font-24 text-dark mt-7 mb-2">
        {t("confirm_forgot_password_form.title")}
      </Typography.Title>
      <div className="text-left">
        <Typography.Text className="text-dark-20">
          {t("confirm_forgot_password_form.description")}
        </Typography.Text>
      </div>
      <Form
        name="confirm-forgot-password"
        form={form}
        layout="vertical"
        autoComplete="off"
        validateTrigger="onBlur"
        requiredMark={false}
        className="mt-3 text-left"
        onFinish={onSubmit}
      >
        <Form.Item
          name="code"
          label={t("verify_code")}
          className="mb-5"
          validateFirst
          rules={[...codeRules(), ...requiredRules(t("verify_code"))]}
        >
          <Input
            placeholder={t(
              "confirm_forgot_password_form.verify_code_placeholder"
            )}
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label={t("confirm_forgot_password_form.password")}
          className="mb-5"
          rules={[...passwordRules(), ...requiredRules(t("password"))]}
          validateFirst
        >
          <Input.Password
            placeholder={t("confirm_forgot_password_form.password_placeholder")}
            size="large"
            maxLength={32}
          />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          className="mb-6"
          label={t("confirm_forgot_password_form.confirm_password")}
          dependencies={["newPassword"]}
          rules={[
            ...confirmPassword(t("newPassword")),
            ...requiredRules(t("confirm_new_password")),
          ]}
          validateFirst
        >
          <Input.Password
            placeholder={t(
              "confirm_forgot_password_form.confirm_password_placeholder"
            )}
            size="large"
            maxLength={32}
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => {
            return (
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                block
                disabled={isInvalidForm({
                  form,
                  fieldsRequire: ["code", "newPassword", "confirmNewPassword"],
                  isSubmitting: isConfirmForgotPasswordLoading,
                })}
              >
                {t("confirm_forgot_password_form.type_in")}
              </Button>
            );
          }}
        </Form.Item>
      </Form>
      <Button
        className="my-4"
        size="large"
        htmlType="submit"
        block
        onClick={() => localStorage.removeItem(EMAIL_STORAGE_KEY)}
        to={AuthPathsEnum.FORGOT_PASSWORD}
      >
        {t("confirm_forgot_password_form.back")}
      </Button>
    </div>
  );
};

export default memo(ConfirmForgotPasswordScreen);
