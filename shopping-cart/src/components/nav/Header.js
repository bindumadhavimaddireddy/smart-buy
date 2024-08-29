import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";

import logo from "../../tools/logo.png";

import { Link } from "react-router-dom";
import Search from '../forms/Search';

const { SubMenu, Item } = Menu;

const Header = () => {
  const dispatch = useDispatch();

  const { user, cart } = useSelector((state) => state);
  const history = useHistory();
  const [current, setCurrent] = useState(" ");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    signOut(auth);
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };
  return (
    <Menu
      onClick={handleClick}
      mode="horizontal"
      selectedKeys={[current]}
      className="container-fluid"
    >
      <img src={logo} width={50} height={50} alt="logo" />
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9,0]}>
            Cart
          </Badge>
        </Link>
      </Item>
      
      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email.split("@")[0]}
          key="settings"
          className="float-right"
        >
          {user && user.role && (
            <Item>
              <Link to={user.role === 'subscriber' ? '/user/dashboard' : '/admin/dashboard'}>Dashboard</Link>
            </Item>
          )}
  
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}

      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}
      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
  );
};

export default Header;
