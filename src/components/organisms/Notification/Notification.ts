import { notification } from "antd";

interface NotificationProps {
  type?: "success" | "info" | "warning" | "error";
  message: string;
  placement?:
    | "top"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight";
  className?: string | undefined;
}

export const openNotification = ({
  type = "error",
  message,
  placement = "top",
  className,
}: NotificationProps) => {
  return notification[type]({
    message,
    placement,
    duration: 3,
    className,
  });
};
