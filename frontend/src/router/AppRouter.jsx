import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Medicaments from '../pages/Medicaments'
import Stock from '../pages/Stock'
import Ventes from '../pages/Ventes'
import Fournisseurs from '../pages/Fournisseurs'
import Clients from '../pages/Clients'

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/medicaments" element={<PrivateRoute><Medicaments /></PrivateRoute>} />
      <Route path="/stock" element={<PrivateRoute><Stock /></PrivateRoute>} />
      <Route path="/ventes" element={<PrivateRoute><Ventes /></PrivateRoute>} />
      <Route path="/fournisseurs" element={<PrivateRoute><Fournisseurs /></PrivateRoute>} />
      <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default AppRouter