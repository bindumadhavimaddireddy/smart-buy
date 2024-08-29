// import React, { useState } from "react";
// import { Menu, Button, Drawer, Sider } from "antd";
// import {
//   AppstoreOutlined,
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   PieChartOutlined,
//   DesktopOutlined,
//   ContainerOutlined,
//   MailOutlined,
// } from "@ant-design/icons";

// const { SubMenu } = Menu;

// const FiltersNav = ({price, setPrice}) => {
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div>
//       <Button
//         type="primary"
//         onClick={toggleCollapsed}
//         style={{ marginBottom: 16 }}
//       >
//         {collapsed ? <MenuUnfoldOutlined />: <MenuFoldOutlined />}
//      </Button>
//       <Drawer title="Search/Filters" placement="left" onClose={toggleCollapsed} visible={collapsed}>
//          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
//              <SubMenu>
//                  <div>
//                     <Sider className="ml-4 mr-4" tipFormatter={(v) => `$${v}`} range value={price} />
//                  </div>
//              </SubMenu>
//          </Menu>
//       </Drawer>
//     </div>
//   );
// };

// export default FiltersNav;
