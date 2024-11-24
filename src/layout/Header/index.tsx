import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { setLang, type Lang } from "@/store/slice/lang";
import styles from "./index.module.scss";

function Header() {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const changeLang = (lang: Lang) => {
    i18n.changeLanguage(lang);
    dispatch(setLang({ lang }));
  };
  return (
    <div className={styles.header}>
      <div className={styles.header_left}></div>
      <div className={styles.header_right}>
        <Button type="primary" onClick={() => changeLang('en_US')}>
          切换英语
        </Button>
        <Button type="primary" onClick={() => changeLang('zh_CN')}>
          切换汉语
        </Button>
      </div>
    </div>
  );
}
export default Header;
