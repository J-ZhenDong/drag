import React, { useState } from "react";
import classNames from "classnames";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "./smallMenu.module.scss";
const items = [
  {
    icon: <MailOutlined />,
    children: [],
  },
  {
    icon: <AppstoreOutlined />,
    children: [],
  },
  {
    icon: <SettingOutlined />,
  },
];
function SmallMenu() {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.small_menu}>
      <div className={styles.project}>
        <img
          className={styles.project_logo}
          src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp"
          alt=""
        />
      </div>
      <div className={styles.menu_wrap}>
        {items.map((item, index) => (
          <div
            className={classNames(styles.menu_item, {
              [styles.menu_item__active]: active === index,
            })}
            onMouseEnter={(item) => {
              console.log('item', item);
              
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
}
export default SmallMenu;
