import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const raw = localStorage.getItem('user');
  const user = raw ? JSON.parse(raw) : null;

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Dashboard</h1>
        {user && <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Welcome, <strong>{user.name}</strong>!</p>}
        <button className={styles.button} onClick={logout}>Sign out</button>
      </div>
    </div>
  );
}
