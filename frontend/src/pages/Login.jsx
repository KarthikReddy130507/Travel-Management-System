import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const API = import.meta.env.VITE_API_URL || 'http://localhost:8081'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Login failed')
      }
      const data = await res.json()
      localStorage.setItem('token', data.token || 'demo-token')
      nav('/dashboard')
    } catch (err) {
      setError(err.message || 'Error')
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email
          <input value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
