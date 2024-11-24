import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { selectRole, type RoleState } from "@/store/slice/role";
import styles from "./index.module.scss";

function HomePage() {
  const { t, i18n } = useTranslation();
  const { role, phone, id, name, avatar }: RoleState = useSelector(selectRole);
  return (
    <div className={styles.home_page}>
      <h1>{t("home.mate")}</h1>
      <h1>{t("home.home")}</h1>
      <div>{role}</div>
      <div>{phone}</div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{avatar}</div>
    </div>
  );
}
export default HomePage;
