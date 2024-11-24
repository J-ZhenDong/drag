import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { zh_CN, en_US } from '@/lang'

const resources = {
  zh_CN: {
    translation: zh_CN
  },
  en_US: {
    translation: en_US
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'zh_CN',
  debug: process.env.NODE_ENV !== 'production',
  load: 'currentOnly',
  fallbackLng: 'zh_CN',
  interpolation: {
    escapeValue: false, // React 已经处理了 XSS 攻击，所以不需要 escape
  },
})
export default i18n
