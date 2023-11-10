import { memo } from "react";

import { Card } from "antd";
import cx from "classnames";

import styles from "./AuthLayout.module.scss";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={cx(styles.container, "flex-center")}>
      <Card>{children}</Card>
    </div>
  );
};

export default memo(AuthLayout);
