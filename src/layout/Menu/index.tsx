import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu as AntMenu,  } from "antd";
import type { MenuProps } from "antd";
import styles from './index.module.scss'

type MenuItem = Required<MenuProps>['items'][number]
const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
];

function Menu() {
  const [current, setCurrent] = useState('1')
  return (
    <div className={styles.menu}>
      <div className={styles.project}>
        <img className={styles.project_logo} src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp" alt="" />
        <span className={styles.project_text}>Drag</span>
      </div>
      <AntMenu
        onClick={(e) => {setCurrent(e.key)}}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </div>
  )
}
export default Menu