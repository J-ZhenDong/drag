import React, {
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import classnames from "classnames";
import { getLang, setLang, type Lang } from "@/store/slice/lang";
import { getTheme, toggleTheme, type Theme } from "@/store/slice/theme";
import { changeTheme } from "@/utils/theme";
import styles from "./index.module.scss";

type Icon = {
  theme: string;
  lang: string;
  window: string;
  notify: string;
};
type ActionItem = {
  id: keyof Icon | "user" | "search";
  icon?: string;
  label?: string;
  component?: ReactNode;
  action?: (v?: any) => void;
};

const SearchBar = () => {
  return (
    <div className={styles.search_bar}>
      <i className="iconfont">&#xe653;</i>
      <span>搜索</span>
      <div>&#8984;&nbsp;K</div>
    </div>
  );
};

const UserControl = () => {
  return (
    <div className={styles.user_control}>
      <img
        src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp"
        alt=""
      />
    </div>
  );
};

const IconButton = (
  props: ActionItem & {
    items?: MenuProps["items"];
  }
) => {
  const { icon, id, items, action } = props;
  if (id === "lang")
    return (
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomLeft">
        <i
          className={classnames("iconfont", styles.header_item_icon)}
          onClick={(e) => action && action(e)}
        >
          {icon}
        </i>
      </Dropdown>
    );
  return (
    <i
      className={classnames("iconfont", styles.header_item_icon)}
      onClick={(e) => action && action(e)}
    >
      {icon}
    </i>
  );
};

function Header() {
  const items: MenuProps["items"] = [
    {
      key: "zh_CN",
      label: <div onClick={() => changeLang("zh_CN")}>简体中文</div>,
    },
    {
      key: "en_US",
      label: <div onClick={() => changeLang("en_US")}>English</div>,
    },
  ];
  const initialActionItem: ActionItem[] = [
    {
      id: "search",
      label: "搜索",
      component: <SearchBar />,
      action: () => {
        console.log("搜索");
      },
    },
    {
      id: "theme",
      label: "主题",
      icon: "\u{e60f}",
      action: (event: ReactMouseEvent) => {
        const value = theme === "dark" ? "light" : "dark";
        changeCurrentTheme(event, value);
      },
    },
    {
      id: "lang",
      label: "语言",
      icon: "\u{e691}",
      action: () => {
        console.log("切换语言");
      },
    },
    {
      id: "window",
      label: "全屏",
      icon: "\u{e60e}",
      action: () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen && document.exitFullscreen();
        }
      },
    },
    {
      id: "notify",
      label: "通知",
      icon: "\u{e64a}",
      action: () => {
        console.log("通知");
      },
    },
    {
      id: "user",
      label: "用户",
      component: <UserControl />,
      action: () => {
        console.log("用户");
      },
    },
  ];

  const dispatch = useDispatch();
  const { theme } = useSelector(getTheme);
  const { lang } = useSelector(getLang);
  const { i18n, t } = useTranslation();
  const [actionItem, setActionItem] = useState<ActionItem[]>(initialActionItem);

  useEffect(() => {
    const themeIconButton = initialActionItem.find(
      (item) => item.id === "theme"
    ) as ActionItem;
    themeIconButton.icon = theme === "dark" ? "\u{e60f}" : "\u{e61e}";
    initialActionItem.splice(1, 1, themeIconButton);
    setActionItem([...initialActionItem]);
  }, [theme]);

  const changeLang = (lang: Lang) => {
    i18n.changeLanguage(lang);
    dispatch(setLang({ lang }));
  };

  const changeCurrentTheme = (e: ReactMouseEvent, themeValue: Theme) => {
    changeTheme(e, themeValue);
    dispatch(toggleTheme({ theme: themeValue }));
  };

  return (
    <div className={styles.header}>
      <div className={styles.header_left}>面包屑</div>
      <div className={styles.header_right}>
        {actionItem.map((item) => (
          <div key={item.id}>
            {item.icon ? (
              <div className={styles.header_item}>
                <IconButton {...item} items={items} />
              </div>
            ) : (
              item.component
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Header;
