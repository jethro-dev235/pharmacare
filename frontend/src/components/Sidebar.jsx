import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const menu = [
  { path: '/', label: '📊 Dashboard' },
  { path: '/medicaments', label: '💊 Médicaments' },
  { path: '/stock', label: '📦 Stock' },
  { path: '/ventes', label: '🛒 Ventes' },
  { path: '/fournisseurs', label: '🚚 Fournisseurs' },
  { path: '/clients', label: '👥 Clients' },
]

function Sidebar() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>💊 PharmaCare</div>
      <div style={styles.userInfo}>
        <p style={styles.userName}>{user?.nom}</p>
        <p style={styles.userRole}>{user?.role}</p>
      </div>
      <nav>
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.link,
              ...(pathname === item.path ? styles.activeLink : {}),
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <button onClick={handleLogout} style={styles.logout}>
        🚪 Déconnexion
      </button>
    </div>
  )
}

const styles = {
  sidebar: {
    width: '240px',
    minHeight: '100vh',
    background: '#1a73e8',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
    position: 'fixed',
    left: 0,
    top: 0,
  },
  logo: {
    fontSize: '22px',
    fontWeight: 'bold',
    padding: '0 20px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
  },
  userInfo: {
    padding: '16px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.2)',
  },
  userName: { margin: 0, fontWeight: '600', fontSize: '15px' },
  userRole: { margin: '4px 0 0', fontSize: '12px', opacity: 0.8, textTransform: 'capitalize' },
  link: {
    display: 'block',
    padding: '12px 20px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '15px',
    transition: 'background 0.2s',
  },
  activeLink: {
    background: 'rgba(255,255,255,0.2)',
    borderLeft: '4px solid white',
  },
  logout: {
    marginTop: 'auto',
    margin: '20px',
    padding: '10px',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
}

export default Sidebar