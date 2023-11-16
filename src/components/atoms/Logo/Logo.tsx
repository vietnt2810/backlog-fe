import { memo } from "react";

import cx from "classnames";
import { useNavigate } from "react-router-dom";

import { AuthPathsEnum } from "@/features/auth/constants/auth.paths";

import styles from "./Logo.module.scss";

interface LogoInterface {
  textWhite?: boolean;
}

const Logo = ({ textWhite = false }: LogoInterface) => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate(AuthPathsEnum.LOGIN);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <span
      onClick={handleNavigateToLogin}
      className={cx(
        styles.logo,
        "cursor-pointer ".concat(textWhite ? "text-white" : "text-logo")
      )}
    >
      backlog
    </span>
  );
};

export default memo(Logo);
