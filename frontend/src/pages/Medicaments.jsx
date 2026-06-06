import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

function Medicaments() {
  const [medicaments, setMedicaments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    nom: '', categorie: '', description: '', prixAchat: '',
    prixVente: '', quantite: '', dateExpiration: '', fabricant: ''
  })
  const [editId, setEditId] = useState(null)
  const { token } = useAuth()
  const headers = { Authorization: `Bearer ${token}` }

  const fetchMedicaments = () => {
    axios.get('http://localhost:5000/api/medicaments', { headers })
      .then(res => setMedicaments(res.data))
  }

  useEffect(() => { fetchMedicaments() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...form, prixAchat: parseFloat(form.prixAchat), prixVente: parseFloat(form.prixVente), quantite: parseInt(form.quantite) }
    if (editId) {
      await axios.put(`http://localhost:5000/api/medicaments/${editId}`, data, { headers })
    } else {
      await axios.post('http://localhost:5000/api/medicaments', data, { headers })
    }
    setForm({ nom: '', categorie: '', description: '', prixAchat: '', prixVente: '', quantite: '', dateExpiration: '', fabricant: '' })
    setShowForm(false)
    setEditId(null)
    fetchMedicaments()
  }

  const handleEdit = (m) => {
    setForm({ ...m, dateExpiration: m.dateExpiration?.split('T')[0] })
    setEditId(m.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce médicament ?')) {
      await axios.delete(`http://localhost:5000/api/medicaments/${id}`, { headers })
      fetchMedicaments()
    }
  }

  return (
    <Layout>
      <div style={styles.header}>
        <h1 style={styles.title}>💊 Médicaments</h1>
        <button onClick={() => setShowForm(!showForm)} style={styles.btn}>
          + Ajouter
        </button>
      </div>

      {showForm && (
        <div style={styles.form}>
          <h3>{editId ? 'Modifier' : 'Ajouter'} un médicament</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              {['nom', 'categorie', 'fabricant', 'description'].map(field => (
                <input key={field} placeholder={field} value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} style={styles.input} required={field !== 'description' && field !== 'fabricant'} />
              ))}
              <input type="number" placeholder="Prix achat" value={form.prixAchat} onChange={e => setForm({ ...form, prixAchat: e.target.value })} style={styles.input} required />
              <input type="number" placeholder="Prix vente" value={form.prixVente} onChange={e => setForm({ ...form, prixVente: e.target.value })} style={styles.input} required />
              <input type="number" placeholder="Quantité" value={form.quantite} onChange={e => setForm({ ...form, quantite: e.target.value })} style={styles.input} required />
              <input type="date" value={form.dateExpiration} onChange={e => setForm({ ...form, dateExpiration: e.target.value })} style={styles.input} required />
            </div>
            <button type="submit" style={styles.btn}>Enregistrer</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ ...styles.btn, background: '#999', marginLeft: '10px' }}>Annuler</button>
          </form>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th>Nom</th><th>Catégorie</th><th>Prix vente</th><th>Quantité</th><th>Expiration</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicaments.map(m => (
            <tr key={m.id} style={styles.row}>
              <td>{m.nom}</td>
              <td>{m.categorie}</td>
              <td>{m.prixVente} FCFA</td>
              <td style={{ color: m.quantite <= 10 ? 'red' : 'green' }}>{m.quantite}</td>
              <td>{new Date(m.dateExpiration).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(m)} style={styles.btnEdit}>✏️</button>
                <button onClick={() => handleDelete(m.id)} style={styles.btnDelete}>🗑️</button>
              </td>
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
  btnEdit: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', marginRight: '8px' },
  btnDelete: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' },
}

export default Medicaments