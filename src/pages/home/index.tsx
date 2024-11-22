import React from 'react'
import { useSelector } from 'react-redux';
import { selectRole, type RoleState } from '@/store/slice/role';
import styles from './index.module.scss'
console.log('styles', styles);

function HomePage() {
  const { role, phone, id, name, avatar }: RoleState = useSelector(selectRole)
  return (
    <div className={styles.home_page}>
      <h1>HomePage</h1>
      <div>{role}</div>
      <div>{phone}</div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{avatar}</div>
    </div>
  )
}
export default HomePage