import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext'
import { setupAPIClient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

export default function Metrics() {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    api.get('/me')
    .then(response => console.log(response))
    .catch(err => console.error(err))
  })

  return (
    <>
      <strong>Métricas</strong>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {  
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/me')

  return {
    props: {}
  }
}, {
  permissions: ['metrics.list'],
  roles: ['editor']
})