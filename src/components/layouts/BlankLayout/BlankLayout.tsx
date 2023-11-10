import { memo } from "react";

interface BlankLayoutProps {
  children: React.ReactNode;
}

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return <div>{children}</div>;
};

export default memo(BlankLayout);
