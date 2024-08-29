import React from "react";
import UserNav from "../../components/nav/UserNav";
import UserRoute from "../../components/routes/UserRoute";
import { Layout } from "antd";
import History from './History'
import Password from "./Password";
import Wishlist from "./Wishlist";

const { Header, Content } = Layout;
const UserDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <UserNav />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <UserRoute exact path="/user/history" component={History} />
          <UserRoute exact path="/user/password" component={Password} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserDashboard;
