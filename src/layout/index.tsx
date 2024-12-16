import React from "react";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMenuType, toggleCollapsed  } from "@/store/slice/menuType";
import Menu from "./Menu";
import Header from "./Header";
import styles from "./index.module.scss";

function Layout() {
  const dispatch = useDispatch()
  const { collapsed } = useSelector(getMenuType)

  return (
    <div className={styles.layout}>
      <aside
        className={styles.layout_aside}
        style={{ width: collapsed ? "80px" : "200px" }}
      >
        <Menu />
        <div className={styles.layout_aside_bottom}>
          <div className={styles.layout_aside_bottom_item}>
            {collapsed? (
              <i className="iconfont" onClick={() => dispatch(toggleCollapsed({collapsed: false}))}>
                &#xe713;
              </i>
            ) : (
              <i className="iconfont" onClick={() => dispatch(toggleCollapsed({collapsed: true}))}>
                &#xe714;
              </i>
            )}
          </div>
        </div>
      </aside>
      <main className={styles.layout_main}>
        <header
          className={styles.layout_header}
          style={{
            width: `calc(100vw - ${collapsed ? "80px" : "200px"})`,
          }}
        >
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
