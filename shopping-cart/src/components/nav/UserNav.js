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

const UserNav = () => {
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
          defaultSelectedKeys={["history"]}
          mode="inline"
          // inlineCollapsed={collapsed}
        >
          <Menu.Item key="history" icon={<HistoryOutlined />}>
            <Link to="/user/history">History</Link>
          </Menu.Item>
          <Menu.Item key="password" icon={<HistoryOutlined />}>
            <Link to="/user/password">Change Password</Link>
          </Menu.Item>
          <Menu.Item key="wishlist" icon={<AccountBookFilled />}>
            <Link to="/user/wishlist">Wishlist</Link>
          </Menu.Item>
       
        </Menu>
      )}
    </div>
  );
};

export default UserNav;
