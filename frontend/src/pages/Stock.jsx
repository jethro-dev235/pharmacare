import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

function Stock() {
  const [stocks, setStocks] = useState([])
  const [medicaments, setMedicaments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ type: 'entree', quantite: '', motif: '', medicamentId: '' })
  const { token } = useAuth()
  const headers = { Authorization: `Bearer ${token}` }

  const fetchData = () => {
    axios.get('http://localhost:5000/api/stocks', { headers }).then(res => setStocks(res.data))
    axios.get('http://localhost:5000/api/medicaments', { headers }).then(res => setMedicaments(res.data))
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/api/stocks', {
      ...form, quantite: parseInt(form.quantite), medicamentId: parseInt(form.medicamentId)
    }, { headers })
    setForm({ type: 'entree', quantite: '', motif: '', medicamentId: '' })
    setShowForm(false)
    fetchData()
  }

  return (
    <Layout>
      <div style={styles.header}>
        <h1 style={styles.title}>📦 Gestion du Stock</h1>
        <button onClick={() => setShowForm(!showForm)} style={styles.btn}>+ Mouvement</button>
      </div>

      {showForm && (
        <div style={styles.form}>
          <h3>Nouveau mouvement de stock</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={styles.input}>
                <option value="entree">Entrée</option>
                <option value="sortie">Sortie</option>
                <option value="ajustement">Ajustement</option>
              </select>
              <select value={form.medicamentId} onChange={e => setForm({ ...form, medicamentId: e.target.value })} style={styles.input} required>
                <option value="">Sélectionner médicament</option>
                {medicaments.map(m => <option key={m.id} value={m.id}>{m.nom}</option>)}
              </select>
              <input type="number" placeholder="Quantité" value={form.quantite} onChange={e => setForm({ ...form, quantite: e.target.value })} style={styles.input} required />
              <input placeholder="Motif" value={form.motif} onChange={e => setForm({ ...form, motif: e.target.value })} style={styles.input} />
            </div>
            <button type="submit" style={styles.btn}>Enregistrer</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ ...styles.btn, background: '#999', marginLeft: '10px' }}>Annuler</button>
          </form>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th>Médicament</th><th>Type</th><th>Quantité</th><th>Motif</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(s => (
            <tr key={s.id} style={styles.row}>
              <td>{s.medicament?.nom}</td>
              <td>
                <span style={{ ...styles.badge, background: s.type === 'entree' ? '#34a853' : s.type === 'sortie' ? '#ea4335' : '#fbbc04' }}>
                  {s.type}
                </span>
              </td>
              <td>{s.quantite}</td>
              <td>{s.motif || '-'}</td>
              <td>{new Date(s.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  )
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { color: '#333', margin: 0 },
  btn: { padding: '10px 20px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' },
  form: { background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' },
  input: { padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', width: '100%', boxSizing: 'border-box' },
  table: { width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  thead: { background: '#1a73e8', color: 'white' },
  row: { borderBottom: '1px solid #eee' },
  badge: { padding: '4px 10px', borderRadius: '20px', color: 'white', fontSize: '12px', fontWeight: '600' },
}

export default Stock