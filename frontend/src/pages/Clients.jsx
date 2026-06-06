import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

function Clients() {
  const [clients, setClients] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nom: '', telephone: '', email: '', adresse: '' })
  const [editId, setEditId] = useState(null)
  const { token } = useAuth()
  const headers = { Authorization: `Bearer ${token}` }

  const fetchClients = () => {
    axios.get('http://localhost:5000/api/clients', { headers }).then(res => setClients(res.data))
  }

  useEffect(() => { fetchClients() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) {
      await axios.put(`http://localhost:5000/api/clients/${editId}`, form, { headers })
    } else {
      await axios.post('http://localhost:5000/api/clients', form, { headers })
    }
    setForm({ nom: '', telephone: '', email: '', adresse: '' })
    setShowForm(false)
    setEditId(null)
    fetchClients()
  }

  const handleEdit = (c) => {
    setForm(c)
    setEditId(c.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce client ?')) {
      await axios.delete(`http://localhost:5000/api/clients/${id}`, { headers })
      fetchClients()
    }
  }

  return (
    <Layout>
      <div style={styles.header}>
        <h1 style={styles.title}>👥 Clients</h1>
        <button onClick={() => setShowForm(!showForm)} style={styles.btn}>+ Ajouter</button>
      </div>

      {showForm && (
        <div style={styles.form}>
          <h3>{editId ? 'Modifier' : 'Ajouter'} un client</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              <input placeholder="Nom" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} style={styles.input} required />
              <input placeholder="Téléphone" value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} style={styles.input} />
              <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={styles.input} />
              <input placeholder="Adresse" value={form.adresse} onChange={e => setForm({ ...form, adresse: e.target.value })} style={styles.input} />
            </div>
            <button type="submit" style={styles.btn}>Enregistrer</button>
            <button type="button" onClick={() => setShowForm(false)} style={{ ...styles.btn, background: '#999', marginLeft: '10px' }}>Annuler</button>
          </form>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th>Nom</th><th>Téléphone</th><th>Email</th><th>Adresse</th><th>Achats</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id} style={styles.row}>
              <td>{c.nom}</td>
              <td>{c.telephone || '-'}</td>
              <td>{c.email || '-'}</td>
              <td>{c.adresse || '-'}</td>
              <td>{c.ventes?.length || 0}</td>
              <td>
                <button onClick={() => handleEdit(c)} style={styles.btnEdit}>✏️</button>
                <button onClick={() => handleDelete(c.id)} style={styles.btnDelete}>🗑️</button>
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

export default Clients