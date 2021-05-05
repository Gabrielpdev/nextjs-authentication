import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext'
import styles from '../styles/Home.module.css';

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  return (
    <div className={styles.container}>
      DASHBOARD
    </div>
  )
}
