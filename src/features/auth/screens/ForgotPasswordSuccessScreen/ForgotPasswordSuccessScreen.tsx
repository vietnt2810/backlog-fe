import { memo } from "react";

import { Typography } from "antd";
import cx from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Button from "@/components/atoms/Button/Button";
import { handleClearLocalStorage } from "@/utils/utils";

import styles from "./ForgotPasswordSuccessScreen.module.scss";
import { AuthPathsEnum } from "../../constants/auth.paths";

const ForgotPasswordSuccessScreen = () => {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();

  const handleRedirectLogin = () => {
    handleClearLocalStorage();
    navigate(AuthPathsEnum.LOGIN);
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
      <Typography.Title level={3} className="font-24 text-dark mt-7 mb-9">
        {t("forgot_password_success.title")}
      </Typography.Title>
      <div className={cx(styles.description, "mt-1 text-left")}>
        <Typography.Text className="text-dark-20">
          {t("forgot_password_success.description")}
        </Typography.Text>
      </div>
      <Button
        type="primary"
        size="large"
        htmlType="submit"
        block
        onClick={handleRedirectLogin}
      >
        {t("forgot_password_success.login")}
      </Button>
    </div>
  );
};

export default memo(ForgotPasswordSuccessScreen);
