import { memo } from "react";

import { DatePicker, Input, InputNumber, Select, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

import Form, { Item, useForm } from "@/components/atoms/Form/Form";
import { SubProject } from "@/features/project/types/project.types";

import styles from "./CreateIssueScreen.module.scss";

interface CreateIssueScreenProps {
  subProject: SubProject;
}

const CreateIssueScreen = ({ subProject }: CreateIssueScreenProps) => {
  const [form] = useForm();

  return (
    <div className={styles.container}>
      <div className="contentHeader">
        <Typography.Text className="font-16 font-weight-bold">
          {subProject.subProjectName}
        </Typography.Text>
        <Typography.Text className="font-12 font-weight-bold ml-2">
          {`(${subProject.subTitle})`}
        </Typography.Text>
      </div>
      <div className="mainContent">
        <Typography className="font-16 font-weight-bold">Add Issue</Typography>
        <Form form={form} colon={false}>
          <Item name="issueType" className="selectButtonItem my-3">
            <Select />
          </Item>
          <Item>
            <Input placeholder="Subject" />
          </Item>
          <div className="formBox mt-3">
            <Item>
              <TextArea
                placeholder="Add a description"
                className="issueDescription"
              />
            </Item>
            <div className="flex-space-between">
              <Item
                labelCol={{ span: 7 }}
                label="Status"
                className="mt-3 formBoxItem"
              >
                <Select className="selectButtonItem ml-10" />
              </Item>
              <Item
                labelCol={{ span: 7 }}
                label="Assignee"
                className="mt-3 formBoxItem"
              >
                <Select className="selectButtonItem ml-10" />
              </Item>
            </div>
            <div className="flex-space-between">
              <Item
                labelCol={{ span: 7 }}
                label="Priority"
                className="formBoxItem"
              >
                <Select className="selectButtonItem ml-10" />
              </Item>
              <Item
                labelCol={{ span: 7 }}
                label="Category"
                className="formBoxItem"
              >
                <Select className="selectButtonItem ml-10" />
              </Item>
            </div>
            <div className="flex-space-between">
              <Item
                labelCol={{ span: 7 }}
                label="Start Date"
                className="formBoxItem"
              >
                <DatePicker className="datePicker ml-10" />
              </Item>
              <Item
                labelCol={{ span: 7 }}
                label="Due Date"
                className="formBoxItem"
              >
                <DatePicker className="datePicker ml-10" />
              </Item>
            </div>
            <div className="flex-space-between">
              <Item
                labelCol={{ span: 7 }}
                label="Estimated Hours"
                className="formBoxItem"
              >
                <InputNumber controls={false} className="inputNumber ml-10" />
              </Item>
              <Item
                labelCol={{ span: 7 }}
                label="Actual Hours"
                className="formBoxItem"
              >
                <InputNumber controls={false} className="inputNumber ml-10" />
              </Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default memo(CreateIssueScreen);
