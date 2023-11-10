import { memo } from "react";

import { Spin } from "antd";
import cx from "classnames";

import styles from "./Loader.module.scss";

const Loader = () => {
  return <Spin className={cx(styles.loading)} />;
};

export default memo(Loader);
