import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext'
import { api } from '../services/api';
import styles from '../styles/Home.module.css';

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
    .then(response => console.log(response))
    .catch(err => console.error(err))
  })

  return (
    <div className={styles.container}>
      DASHBOARD
    </div>
  )
}
