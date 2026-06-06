import Sidebar from './Sidebar'

function Layout({ children }) {
  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.main}>
        {children}
      </main>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f5f7fa',
  },
  main: {
    marginLeft: '240px',
    flex: 1,
    padding: '30px',
  },
}

export default Layout