import React, { useState, useEffect } from "react";
import { useRoutes, RouterProvider} from "react-router-dom";
import { useSelector } from "react-redux";
import { ConfigProvider } from "antd";
import en_US from "antd/locale/en_US";
import zh_CN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/zh-cn";
import { getLang, type LangState } from "@/store/slice/lang";
import { getTheme, type ThemeState } from "@/store/slice/theme";
import { AntDarkTheme, AntLightTheme } from "@/utils/theme";
import routes from "./routes";
import './App.scss'
const langMap = {
  en_US,
  zh_CN,
};
const dayjsLangMap = {
  en_US: 'en',
  zh_CN: 'zh-cn'
}

function App() {
  const { lang }: LangState = useSelector(getLang);
  const { theme }: ThemeState = useSelector(getTheme);
  const [locale, setLocale] = useState(zh_CN);
  const [themeConfig, setThemeConfig] = useState<any>({});
  
  useEffect(() => {
    const antdLocale = langMap[lang] || zh_CN;
    const dayjsLocale = dayjsLangMap[lang] || 'zh-cn'
    setLocale(antdLocale);
    dayjs.locale(dayjsLocale)
  }, [lang]);
  useEffect(() => {
    console.log('theme', theme);
    setThemeConfig(theme === 'dark' ? AntDarkTheme : AntLightTheme)
  }, [theme])
  return (
    <ConfigProvider
      locale={locale}
      componentSize={"large"}
      theme={{
        components: {
          ...themeConfig
        }
      }}
    >
      <RouterProvider router={routes}/>
      {/* {useRoutes(routes)} */}
    </ConfigProvider>
  );
}
export default App;
