import { memo } from "react";

import cx from "classnames";

import Logo from "@/components/atoms/Logo/Logo";

import styles from "./AuthLayout.module.scss";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={cx(styles.container, "my-6 px-8")}>
      <div className="flex-space-between">
        <Logo />
        <p className="font-18">Contact us</p>
      </div>
      <div className="auth-content flex-center">{children}</div>
    </div>
  );
};

export default memo(AuthLayout);
