import { ChangeEvent, memo, useEffect, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Input, Modal, ModalProps, Typography } from "antd";
import cx from "classnames";

import styles from "./ProjectMembersModal.module.scss";

interface ProjectMembersModalProps extends ModalProps {
  members?: any;
}

const ProjectMembersModal = ({
  members,
  ...props
}: ProjectMembersModalProps) => {
  const [filteredMembers, setFilteredMembers] = useState<any>();

  const handleFilterMember = (e: ChangeEvent<HTMLInputElement>) => {
    setFilteredMembers(
      members?.filter((member: any) =>
        member.username.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    setFilteredMembers(members);
  }, [members]);

  return (
    <Modal
      closable={false}
      footer={false}
      className="projectMembersModal"
      {...props}
    >
      <div className={styles.header}>
        <Typography className="text-white font-16 font-weight-half-bold flex-align-center">
          Project Members
        </Typography>
        <Input
          onChange={e => handleFilterMember(e)}
          prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.45)" }} />}
          className={styles.searchInput}
          placeholder="Search members"
          allowClear
          autoFocus
        />
      </div>
      <div className={styles.memberList}>
        {filteredMembers?.length ? (
          filteredMembers?.map((member: any) => (
            <div className={cx(styles.memberItem, "flex-align-center")}>
              {member.user.avatarUrl ? (
                <img
                  className={styles.avatar}
                  alt="avatar"
                  src={member.user.avatarUrl}
                />
              ) : (
                <div className={cx(styles.avatar, "flex-center")}>
                  {member.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="ml-3">
                <Typography className="text-pink">{member.username}</Typography>
                <Typography className="font-13">
                  {member.role ? "Admin" : "Member"}
                </Typography>
              </div>
            </div>
          ))
        ) : (
          <div className={cx(styles.memberItem, "flex-align-center")}>
            No members were found
          </div>
        )}
      </div>
    </Modal>
  );
};

export default memo(ProjectMembersModal);
