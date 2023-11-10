import { memo } from "react";

import { Button as AntdButton } from "antd";
import { ButtonProps as AntdButtonProps } from "antd/es/button";
import cx from "classnames";
import { Link } from "react-router-dom";
import { LinkProps } from "react-router-dom";

import styles from "./Button.module.scss";

interface ButtonProps extends Omit<AntdButtonProps, "href"> {
  /**
   * Turn button into link, accepts internal and external links (optional)
   */
  to?: LinkProps["to"];
  /**
   * Remove horizontal padding (optional)
   */
  noPadding?: boolean;
  width?: number;
  height?: number;
  borderRadius?: number;
}

const Button = ({
  className,
  noPadding,
  width,
  height,
  borderRadius,
  children,
  to,
  ...rest
}: ButtonProps) => {
  const buttonContent = (
    <AntdButton
      className={cx(styles.button, className, {
        [styles.noPadding]: noPadding,
      })}
      style={{ width, height, borderRadius }}
      {...rest}
    >
      {typeof children === "string" ? children.split("") : children}
    </AntdButton>
  );

  if (to) {
    return <Link to={to}>{buttonContent}</Link>;
  }

  return buttonContent;
};

export default memo(Button);
