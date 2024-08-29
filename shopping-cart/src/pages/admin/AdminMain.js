import React from "react";
import { Switch } from "react-router-dom";
import AdminRoute from "../../components/routes/AdminRoute";
import { Layout } from "antd";
import AdminNav from "../../components/nav/AdminNav";
import CategoryCreate from "./category/CategoryCreate";
import CategoryUpdate from "./category/CategoryUpdate";
import SubCreate from "./sub/SubCreate";
import SubUpdate from "./sub/SubUpdate";
import ProductCreate from "./product/ProductCreate";
import AdminDashboard from "./AdminDashboard";
import AllProducts from "./product/AllProducts";
import ProductUpdate from "./product/ProductUpdate";
import CreateCouponPage from "./coupon/CreateCouponPage";

const { Header, Content } = Layout;
const AdminMain = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminNav />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content>
          <Switch>
            <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
            <AdminRoute
              path="/admin/product/:slug"
              component={ProductUpdate}
            />
            <AdminRoute path="/admin/product" component={ProductCreate} />
            <AdminRoute path="/admin/products" component={AllProducts} />
            <AdminRoute
              path="/admin/category/:slug"
              component={CategoryUpdate}
            />
            <AdminRoute path="/admin/category" component={CategoryCreate} />
            <AdminRoute exact path="/admin/sub/:slug" component={SubUpdate} />
            <AdminRoute path="/admin/sub" component={SubCreate} />
            <AdminRoute exact path="/admin/coupon" component={CreateCouponPage} />
          
          </Switch>

          {/* <AdminRoute exact path="/admin/wishlist" component={Wishlist} /> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminMain;
