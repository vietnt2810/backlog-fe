import { memo } from "react";

import cx from "classnames";

import DashboardHeader from "@/components/layouts/DashboardHeader/DashboardHeader";
import Loader from "@/components/organisms/Loader/Loader";
import { USER_ID } from "@/constants/constants";

import styles from "./UserProfile.module.scss";
import useGetUser from "../../hooks/useGetUser";

const UserProfile = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, isGetUserLoading } = useGetUser(
    String(localStorage.getItem(USER_ID))
  );

  return (
    <div className={cx(styles.container)}>
      <DashboardHeader subHeaderTitle="ACCOUNT" />
      {isGetUserLoading ? (
        <Loader />
      ) : (
        <div className="mainContent">123123</div>
      )}
    </div>
  );
};

export default memo(UserProfile);
