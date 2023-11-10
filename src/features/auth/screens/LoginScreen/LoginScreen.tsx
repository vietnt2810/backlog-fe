import { memo } from "react";

import { Button, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  emailRules,
  passwordRules,
  requiredRules,
} from "@/helpers/validations.helpers";
import { handleErrorSubmitted, isInvalidForm } from "@/utils/utils";

import styles from "./LoginScreen.module.scss";
import { AuthPathsEnum } from "../../constants/auth.paths";
import useAuth from "../../hooks/useAuth";
import { LoginRequestBody } from "../../types/auth.types";

const LoginScreen = () => {
  const { t } = useTranslation("auth");
  const [form] = Form.useForm<LoginRequestBody>();
  const navigate = useNavigate();
  const location = useLocation();

  const { postLogin, isPostLoginLoading } = useAuth();

  const from = location.state?.from?.pathname;

  const onFinish = (values: LoginRequestBody) => {
    postLogin(values)
      .then(() => navigate(from, { replace: true })) // TODO: Redirect to dashboard
      .catch(err => {
        handleErrorSubmitted(form, err);
      });
  };

  return (
    <div className={styles.loginScreen}>
      <Typography.Text className="font-19 font-weight-bold text-dark-10">
        SWAG CONCIERGE
      </Typography.Text>
      <Typography.Title level={3} className="text-dark pt-7 pb-3 font-24">
        {t("login_form.title")}
      </Typography.Title>
      <Typography.Text className="font-14 text-dark-20">
        {t("login_form.description")}
      </Typography.Text>

      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
        className="pt-9 text-left"
        validateTrigger="onBlur"
      >
        <Form.Item
          name="email"
          label={t("email").toUpperCase()}
          rules={[...requiredRules(t("email")), ...emailRules(t("email"))]}
          validateFirst
        >
          <Input
            placeholder={t("login_form.email_placeholder")}
            size="large"
            maxLength={100}
          />
        </Form.Item>

        <Form.Item
          className="position-relative"
          name="password"
          htmlFor="password"
          label={t("password")}
          rules={[...passwordRules(), ...requiredRules(t("password"))]}
          validateFirst
        >
          <div className="flex-space-between-center">
            <Link
              className="position-absolute font-10 text-forgot-password text-dark-20"
              to={AuthPathsEnum.FORGOT_PASSWORD}
            >
              {t("login_form.forgot_password")}
            </Link>

            <Input.Password
              id="password"
              placeholder={t("login_form.password_placeholder")}
              size="large"
              maxLength={32}
            />
          </div>
        </Form.Item>
        <Form.Item
          shouldUpdate={(prevValues, curValues) => prevValues === curValues}
        >
          {() => (
            <Button
              className="button-submit"
              type="primary"
              size="large"
              htmlType="submit"
              block
              disabled={isInvalidForm({
                form,
                fieldsRequire: ["email", "password"],
                isSubmitting: isPostLoginLoading,
              })}
            >
              {t("login")}
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(LoginScreen);
