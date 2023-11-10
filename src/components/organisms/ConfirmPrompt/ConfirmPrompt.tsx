import { Modal, ModalFuncProps, Space, Typography } from "antd";
import { t } from "i18next";

import ExclamationCircle from "@/assets/images/exclamation-circle-icon.svg";

const { confirm } = Modal;

interface ConfirmPromptProps extends ModalFuncProps {
  isShowTitle?: boolean;
  confirmTitle?: string;
}

export const confirmPrompt = ({
  cancelText = t("button.cancel"),
  okText = t("button.ok"),
  isShowTitle = true,
  confirmTitle,
  ...rest
}: ConfirmPromptProps) => {
  // TODO: confirm spec
  const title = isShowTitle ? (
    <Space size={16}>
      <img src={ExclamationCircle} alt="Exclamation_Circle_Icon" />{" "}
      <Typography.Title level={5}>{confirmTitle}</Typography.Title>
    </Space>
  ) : undefined;

  return confirm({
    cancelText,
    cancelButtonProps: {
      type: "default",
    },
    okText,
    closable: false,
    maskClosable: true,
    centered: true,
    icon: null,
    title,
    ...rest,
  });
};
