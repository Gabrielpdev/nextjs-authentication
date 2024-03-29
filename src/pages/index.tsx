import { GetServerSideProps } from 'next';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext'
import { parseCookies } from 'nookies';

import styles from '../styles/Home.module.css';
import { withSSRGuest } from '../utils/withSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const data = {
      email,
      password
    }

    await signIn(data)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input type="email" value={email} onChange={event => setEmail(event.target.value)} />
      <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
      <button type="submit">entrar</button>
    </form>
  )
}

export const getServerSideProps = withSSRGuest(async (ctx) => {  
  
  return {
    props: {}
  }
})