import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import {
  AccountBookFilled,
  HeartFilled,
  HistoryOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const AdminNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <Button type="primary" onClick={onCollapse} style={{ marginBottom: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>

      {collapsed && (
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          // inlineCollapsed={collapsed}
        >
          <Menu.Item key="dashboard" icon={<HistoryOutlined />}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="product" icon={<HistoryOutlined />}>
            <Link to="/admin/product">Product</Link>
          </Menu.Item>
          <Menu.Item key="products" icon={<AccountBookFilled />}>
            <Link to="/admin/products">Products</Link>
          </Menu.Item>
          <Menu.Item key="category" icon={<HeartFilled />}>
            <Link to="/admin/category">Category</Link>
          </Menu.Item>
          <Menu.Item key="sub" icon={<HeartFilled />}>
            <Link to="/admin/sub">Sub Category</Link>
          </Menu.Item>
          <Menu.Item key="coupon" icon={<HeartFilled />}>
            <Link to="/admin/coupon">Coupons</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default AdminNav;
