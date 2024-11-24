import React from "react";
import { Outlet, useLocation } from "react-router";
import Menu from "./Menu";
import Header from "./Header";
import styles from "./index.module.scss";
function Layout() {
  return (
    <div className={styles.layout}>
      <aside className={styles.layout_aside}>
        <Menu />
      </aside>
      <main className={styles.layout_main}>
        <header className={styles.layout_header}>
          <Header />
        </header>
        <section className={styles.layout_content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
export default Layout;
