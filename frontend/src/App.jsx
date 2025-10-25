import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Travel Portal</h1>
        <nav>
          <Link to="/">Login</Link> | <Link to="/signup">Signup</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
