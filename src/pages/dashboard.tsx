import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext'
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import styles from '../styles/Home.module.css';
import { withSSRAuth } from '../utils/withSSRAuth';

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

export const getServerSideProps = withSSRAuth(async (ctx) => {  
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me')
  console.log(response)

  return {
    props: {}
  }
})