import { memo } from "react";

import { Form, Input, Typography } from "antd";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import { emailRules, requiredRules } from "@/helpers/validations.helpers";
import { handleErrorSubmitted, isInvalidForm } from "@/utils/utils";

import styles from "./ForgotPasswordScreen.module.scss";
import { AuthPathsEnum } from "../../constants/auth.paths";
import useForgotPassword from "../../hooks/useForgotPassword";
import { ForgotPasswordRequestBody } from "../../types/auth.types";

const ForgotPasswordScreen = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const { postForgotPassword, isForgotPasswordLoading } = useForgotPassword();

  const [form] = Form.useForm<ForgotPasswordRequestBody>();

  const onSubmit = (data: ForgotPasswordRequestBody) => {
    postForgotPassword(data)
      .then(() => navigate(AuthPathsEnum.CONFIRM_FORGOT_PASSWORD))
      .catch(err => handleErrorSubmitted(form, err));
  };

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
        {t("forgot_password_form.title")}
      </Typography.Title>
      <div className="text-left">
        <Typography.Text className="text-dark-20">
          {t("forgot_password_form.description")}
        </Typography.Text>
      </div>
      <Form
        name="reset-password"
        form={form}
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        validateTrigger="onBlur"
        className="mt-9 text-left"
        onFinish={onSubmit}
      >
        <Form.Item
          name="email"
          className="mb-10"
          label={t("email").toUpperCase()}
          rules={[...emailRules(t("email")), ...requiredRules(t("email"))]}
          validateFirst
        >
          <Input
            placeholder={t("forgot_password_form.email_placeholder")}
            size="large"
          />
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, curValues) => prevValues === curValues}
        >
          {() => {
            return (
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                disabled={isInvalidForm({
                  form,
                  fieldsRequire: ["email"],
                  isSubmitting: isForgotPasswordLoading,
                })}
                className="mt-2"
                block
              >
                {t("forgot_password_form.send")}
              </Button>
            );
          }}
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(ForgotPasswordScreen);
