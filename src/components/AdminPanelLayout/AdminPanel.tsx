import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CommentOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import NavbarApi from "../Navbar/api";
import { useAppDispatch } from "../../redux/store/hooks";
import { logoutUser } from "../../redux/reducers/userSlice";

const { Header, Sider, Content } = Layout;

const AdminPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p>Go home</p>,
      icon: <AiOutlineHome />,
      onClick: () => navigate("/"),
    },
    {
      key: "2",
      label: <p>Log out</p>,
      icon: <BiLogOut />,
      onClick: () => handleLogout(),
    },
  ];
  const handleLogout = async () => {
    try {
      await NavbarApi.logout();
      navigate("/");
      dispatch(logoutUser());
    } catch (error) {}
  };
  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={[
            {
              key: "0",
              icon: <AiOutlineHome />,
              label: "Home",
              onClick: () => navigate(""),
            },
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Users",
              onClick: () => navigate("users"),
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Tours",
              onClick: () => navigate("tours"),
            },
            {
              key: "3",
              icon: <CommentOutlined />,
              label: "Reviews",
              onClick: () => navigate("reviews"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown menu={{ items }}>
            <Button
              type="text"
              icon={<AiOutlineUser />}
              style={{
                fontSize: "21px",
                width: 64,
                height: 64,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
