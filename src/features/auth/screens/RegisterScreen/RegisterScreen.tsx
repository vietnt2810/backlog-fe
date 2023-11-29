import { memo } from "react";

import { Button, Card, Form, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { openNotification } from "@/components/organisms/Notification/Notification";
import {
  emailRules,
  passwordRules,
  requiredRules,
} from "@/helpers/validations.helpers";
import { isInvalidForm } from "@/utils/utils";

import styles from "./RegisterScreen.module.scss";
import { AuthPathsEnum } from "../../constants/auth.paths";
import useAuth from "../../hooks/useAuth";
import { RegisterRequestBody } from "../../types/auth.types";

const RegisterScreen = () => {
  const { t } = useTranslation("auth");
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { postRegister, isPostRegisterLoading } = useAuth();

  const onFinish = (values: RegisterRequestBody) => {
    postRegister(values)
      .then(() => {
        openNotification({
          type: "success",
          message: "Created new user successfully",
        });
        navigate(AuthPathsEnum.LOGIN);
      })
      .catch(err => {
        openNotification({
          message: err.error,
        });
      });
  };

  return (
    <div>
      <Typography className="font-40 font-weight-bold mb-6 text-dark">
        Sign up for a Backlog Account
      </Typography>
      <Card>
        <div className={styles.loginScreen}>
          <Typography.Title level={3} className="text-dark pt-7 pb-3 font-24">
            Sign up
          </Typography.Title>
          <Typography.Text className="font-14 text-dark-20">
            Signing up an account
          </Typography.Text>

          <Form
            form={form}
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
            className="pt-6 text-left"
            validateTrigger="onBlur"
          >
            <Form.Item
              name="email"
              label="EMAIL"
              rules={[...requiredRules("email"), ...emailRules(t("email"))]}
              validateFirst
            >
              <Input
                placeholder={t("login_form.email_placeholder")}
                size="large"
                maxLength={100}
              />
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[...requiredRules("username")]}
              validateFirst
            >
              <Input placeholder="Username" size="large" maxLength={100} />
            </Form.Item>
            <Form.Item
              className="position-relative"
              name="password"
              htmlFor="password"
              label="Password"
              rules={[...passwordRules(), ...requiredRules("password")]}
              validateFirst
            >
              <div className="flex-space-between-center">
                <Input.Password
                  id="password"
                  placeholder={t("login_form.password_placeholder")}
                  size="large"
                  maxLength={32}
                />
              </div>
            </Form.Item>
            <Form.Item
              className="buttonItem"
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
                    fieldsRequire: ["email", "password", "username"],
                    isSubmitting: isPostRegisterLoading,
                  })}
                >
                  Sign up
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default memo(RegisterScreen);
