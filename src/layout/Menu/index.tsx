import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu as AntMenu } from "antd";
import type { MenuProps } from "antd";
import { useSelector } from "react-redux";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { getMenuType } from "@/store/slice/menuType";
import styles from "./index.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

function Menu() {
  const [current, setCurrent] = useState("1");
  const { t } = useTranslation();
  const { collapsed } = useSelector(getMenuType);
  const items: MenuItem[] = [
    {
      key: "sub1",
      label: t("route.viewData"),
      icon: <MailOutlined />,
      children: [{ key: "1", label: <NavLink to={"/login"}>登陆</NavLink> }],
    },
    {
      key: "sub2",
      label: t("route.application"),
      icon: <AppstoreOutlined />,
      children: [
        { key: "5", label: "Option 5" },
        { key: "6", label: "Option 6" },
        {
          key: "sub3",
          label: "Submenu",
          children: [
            { key: "7", label: "Option 7" },
            { key: "8", label: "Option 8" },
          ],
        },
      ],
    },
    {
      key: "sub4",
      label: t("route.tools"),
      icon: <SettingOutlined />,
      children: [
        { key: "2", label: <NavLink to={"/seatEdit"}>座位编辑</NavLink> },
        { key: "3", label: <NavLink to={"/seatView"}>座位渲染</NavLink> },
        { key: "4", label: <NavLink to={"/svg"}>SVG</NavLink> },
      ],
    },
  ];

  return (
    <div className={styles.menu}>
      <div className={styles.project}>
        <img
          className={styles.project_logo}
          src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp"
          alt=""
        />
        <span
          className={styles.project_text}
          style={{ display: collapsed ? "none" : "inline" }}
        >
          Drag
        </span>
      </div>
      <AntMenu
        onClick={(e) => {
          setCurrent(e.key);
        }}
        inlineCollapsed={collapsed}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </div>
  );
}
export default Menu;
