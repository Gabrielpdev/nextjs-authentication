import { useContext, useEffect, useState } from 'react';
import { Can } from '../components/Can';
import { AuthContext } from '../context/AuthContext'
import { useCan } from '../hooks/useCan';
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
      <h1>DASHBOARD</h1>
      <strong>User: {user?.email}</strong>

      <Can permissions={['metrics.list']} >
        <strong>Métricas</strong>
      </Can>
    </div>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {  
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me')

  return {
    props: {}
  }
})