import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { selectRole, type RoleState } from "@/store/slice/role";
import { setLang } from "@/store/slice/lang";
import styles from "./index.module.scss";

function HomePage() {
  const { t, i18n } = useTranslation();
  const { role, phone, id, name, avatar }: RoleState = useSelector(selectRole);
  const dispatch = useDispatch();
  return (
    <div className={styles.home_page}>
      <h1>{t("home.mate")}</h1>
      <h1>{t("home.home")}</h1>
      <div>{role}</div>
      <div>{phone}</div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{avatar}</div>
      <Button 
        type="primary"
        onClick={() => {
          i18n.changeLanguage('en_US')
          dispatch(setLang({ lang: "en_US" }));
        }}
      >切换语言</Button>
    </div>
  );
}
export default HomePage;
