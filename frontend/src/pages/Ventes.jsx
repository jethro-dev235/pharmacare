import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

function Ventes() {
  const [ventes, setVentes] = useState([])
  const [medicaments, setMedicaments] = useState([])
  const [clients, setClients] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [clientId, setClientId] = useState('')
  const [items, setItems] = useState([{ medicamentId: '', quantite: 1, prixUnitaire: 0 }])
  const { token } = useAuth()
  const headers = { Authorization: `Bearer ${token}` }

  const fetchData = () => {
    axios.get('http://localhost:5000/api/ventes', { headers }).then(res => setVentes(res.data))
    axios.get('http://localhost:5000/api/medicaments', { headers }).then(res => setMedicaments(res.data))
    axios.get('http://localhost:5000/api/clients', { headers }).then(res => setClients(res.data))
  }

  useEffect(() => { fetchData() }, [])

  const handleItemChange = (index, field, value) => {
    const newItems = [...items]
    newItems[index][field] = value
    if (field === 'medicamentId') {
      const med = medicaments.find(m => m.id === parseInt(value))
      if (med) newItems[index].prixUnitaire = med.prixVente
    }
    setItems(newItems)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/api/ventes', {
      clientId: clientId || null,
      items: items.map(i => ({ ...i, medicamentId: parseInt(i.medicamentId), quantite: parseInt(i.quantite) }))
    }, { headers })
    setShowForm(false)
    setItems([{ medicamentId: '', quantite: 1, prixUnitaire: 0 }])
    setClientId('')
    fetchData()
  }

  const total = items.reduce((sum, i) => sum + (i.prixUnitaire * i.quantite), 0)

  return (
    <Layout>
      <div style={styles.header}>
        <h1 style={styles.title}>🛒 Ventes</h1>
        <button onClick={() => setShowForm(!showForm)} style={styles.btn}>+ Nouvelle vente</button>
      </div>

      {showForm && (
        <div style={styles.form}>
          <h3>Nouvelle vente</h3>
          <select value={clientId} onChange={e => setClientId(e.target.value)} style={{ ...styles.input, marginBottom: '16px' }}>
            <option value="">Client anonyme</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
          </select>

          {items.map((item, index) => (
            <div key={index} style={styles.itemRow}>
              <select value={item.medicamentId} onChange={e => handleItemChange(index, 'medicamentId', e.target.value)} style={styles.input} required>
                <option value="">Médicament</option>
                {medicaments.map(m => <option key={m.id} value={m.id}>{m.nom}</option>)}
              </select>
              <input type="number" min="1" value={item.quantite} onChange={e => handleItemChange(index, 'quantite', e.target.value)} style={styles.input} />
              <span style={styles.prix}>{(item.prixUnitaire * item.quantite).toFixed(0)} FCFA</span>
            </div>
          ))}

          <button type="button" onClick={() => setItems([...items, { medicamentId: '', quantite: 1, prixUnitaire: 0 }])} style={{ ...styles.btn, background: '#34a853', marginBottom: '16px' }}>
            + Ajouter produit
          </button>

          <div style={styles.total}>Total : {total.toFixed(0)} FCFA</div>

          <form onSubmit={handleSubmit}>
            <button type="submit" onClick={handleSubmit} style={styles.btn}>Valider la vente</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ ...styles.btn, background: '#999', marginLeft: '10px' }}>Annuler</button>
          </form>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th>N° Facture</th><th>Client</th><th>Montant</th><th>Caissier</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {ventes.map(v => (
            <tr key={v.id} style={styles.row}>
              <td>{v.numero}</td>
              <td>{v.client?.nom || 'Anonyme'}</td>
              <td>{v.montant} FCFA</td>
              <td>{v.user?.nom}</td>
              <td>{new Date(v.dateVente).toLocaleDateString()}</td>
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
  itemRow: { display: 'grid', gridTemplateColumns: '1fr 100px 120px', gap: '12px', marginBottom: '12px', alignItems: 'center' },
  input: { padding: '8px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', width: '100%', boxSizing: 'border-box' },
  prix: { fontWeight: '600', color: '#1a73e8' },
  total: { fontSize: '20px', fontWeight: 'bold', color: '#1a73e8', margin: '16px 0' },
  table: { width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  thead: { background: '#1a73e8', color: 'white' },
  row: { borderBottom: '1px solid #eee' },
}

export default Ventes