import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [alertes, setAlertes] = useState(null)
  const { token } = useAuth()

  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get('http://localhost:5000/api/ventes/stats', { headers })
      .then(res => setStats(res.data))
      .catch(console.error)

    axios.get('http://localhost:5000/api/stocks/alertes', { headers })
      .then(res => setAlertes(res.data))
      .catch(console.error)
  }, [])

  return (
    <Layout>
      <h1 style={styles.title}>📊 Tableau de bord</h1>

      <div style={styles.cards}>
        <div style={{ ...styles.card, background: '#1a73e8' }}>
          <h3 style={styles.cardTitle}>Médicaments</h3>
          <p style={styles.cardValue}>{stats?.totalMedicaments ?? '...'}</p>
        </div>
        <div style={{ ...styles.card, background: '#34a853' }}>
          <h3 style={styles.cardTitle}>Ventes</h3>
          <p style={styles.cardValue}>{stats?.totalVentes ?? '...'}</p>
        </div>
        <div style={{ ...styles.card, background: '#fbbc04' }}>
          <h3 style={styles.cardTitle}>Chiffre d'affaires</h3>
          <p style={styles.cardValue}>{stats?.chiffreAffaires?.toFixed(0) ?? '...'} FCFA</p>
        </div>
        <div style={{ ...styles.card, background: '#ea4335' }}>
          <h3 style={styles.cardTitle}>Alertes stock</h3>
          <p style={styles.cardValue}>
            {alertes ? alertes.stockFaible.length + alertes.rupture.length : '...'}
          </p>
        </div>
      </div>

      {alertes && alertes.rupture.length > 0 && (
        <div style={styles.alertBox}>
          <h3>🚨 Rupture de stock</h3>
          {alertes.rupture.map(m => (
            <p key={m.id} style={styles.alertItem}>• {m.nom}</p>
          ))}
        </div>
      )}

      {alertes && alertes.prochesExpiration.length > 0 && (
        <div style={{ ...styles.alertBox, background: '#fff8e1', borderColor: '#fbbc04' }}>
          <h3>⚠️ Proches expiration</h3>
          {alertes.prochesExpiration.map(m => (
            <p key={m.id} style={styles.alertItem}>• {m.nom}</p>
          ))}
        </div>
      )}
    </Layout>
  )
}

const styles = {
  title: { marginBottom: '24px', color: '#333' },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  card: {
    padding: '24px',
    borderRadius: '12px',
    color: 'white',
  },
  cardTitle: { margin: '0 0 8px', fontSize: '14px', opacity: 0.9 },
  cardValue: { margin: 0, fontSize: '32px', fontWeight: 'bold' },
  alertBox: {
    background: '#ffebee',
    border: '1px solid #ea4335',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
  },
  alertItem: { margin: '4px 0', color: '#333' },
}

export default Dashboard