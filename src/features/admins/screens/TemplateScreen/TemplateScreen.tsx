import { memo, useState } from "react";

import {
  Checkbox,
  Form,
  Input,
  Pagination,
  Radio,
  Select,
  Space,
  Typography,
  Table,
  Card,
} from "antd";
import { ColumnsType } from "antd/es/table";

import Button from "@/components/atoms/Button/Button";

/*
Note: CÁCH DÙNG ICONMON
1. Trên figma, export icon dạng file SVG (nhớ check kỹ Preview bên dưới xem đúng icon đã chọn chưa).
2. Vào trang web https://icomoon.io/app/#/projects. Import folder iconmon vào project
3. Import icon vừa download về vào project. 
4. Click chọn Generate Font -> Get code -> Nhúng css của từng icon vào file icons.module.scss.
*/

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const TemplateScreen = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
    },
    {
      key: "4",
      name: "Disabled User",
      age: 99,
      address: "Sydney No. 1 Lake Park",
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Card
      title={
        <Typography.Title level={3} className="font-weight-normal">
          企業管理
        </Typography.Title>
      }
      extra={
        <div>
          <Button type="primary" className="mr-5 px-6">
            登録
          </Button>
          <Button className="px-6">戻る</Button>
        </div>
      }
    >
      <Typography.Title level={1}>企業管理</Typography.Title>
      <Typography.Title level={2}>企業一覧</Typography.Title>
      <Typography.Title level={3}>企業一覧</Typography.Title>
      <div className="mb-4">
        <Button type="primary" size="small" className="mb-3">
          郵便番号から設定
        </Button>
        <br />
        <Button type="primary" className="mb-3">
          新規登録
        </Button>
        <br />
        <Button type="primary" className="mb-3 px-3">
          編集
        </Button>
        <br />
        <Button className="mb-3 px-3">削除</Button>
        <br />
        <Button type="primary" size="large">
          ログイン
        </Button>
        <br />
        <Button type="primary" danger className="mt-3">
          郵便番号から設定
        </Button>
        <br />
        <Button type="primary" danger className="mt-3" disabled>
          郵便番号から設定
        </Button>
        <br />
        <Button disabled className="mt-3">
          追加
        </Button>
      </div>
      <div>
        <Input className="mb-2" placeholder="default size" />
        <Input
          className="mb-2 px-4 bg-primary-input"
          placeholder="Email address"
          size="large"
        />
        <Input className="mb-2" value="00001" disabled />
      </div>
      <div className="mb-4">
        <Radio>管理者権限</Radio>
        <Radio>管理者権限</Radio>
      </div>
      <div>
        <Checkbox />
      </div>
      <Pagination
        defaultCurrent={1}
        total={100}
        locale={{ items_per_page: "/ ページ" }}
      />
      <div className="my-4">
        <Select
          style={{ width: 150 }}
          options={[
            { value: "jack", label: "電話番号" },
            { value: "lucy", label: "電話番号" },
            { value: "Yiminghe", label: "電話番号" },
            { value: "kataishioa", label: "電話番号" },
          ]}
          suffixIcon={<span className="icon-down-square" />}
          placeholder="都道府県"
          // open
        />
      </div>
      <Space style={{ width: "100%" }} direction="vertical">
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          suffixIcon={<span className="icon-down-square" />}
          options={[
            { value: "jack", label: "電話番号" },
            { value: "lucy", label: "電話番号" },
            { value: "Yiminghe", label: "電話番号" },
            { value: "kataishioa", label: "電話番号" },
            { value: "jack1", label: "電話番号" },
            { value: "lucy1", label: "電話番号" },
            { value: "Yiminghe1", label: "電話番号" },
            { value: "kataishioa1", label: "電話番号" },
            { value: "kataishioa2", label: "ダッシュボード" },
          ]}
        />
      </Space>
      <Form className="mt-4">
        <Form.Item label="企業コード" rules={[{ required: true }]} name="email">
          <Input />
        </Form.Item>
        <Form.Item
          label="企業コード"
          rules={[{ required: true }]}
          name="password"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="企業コード"
          rules={[{ required: true }]}
          name="forgot-password"
        >
          <Input />
        </Form.Item>
      </Form>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </Card>
  );
};
export default memo(TemplateScreen);
