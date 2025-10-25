import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const API = import.meta.env.VITE_API_URL || 'http://localhost:8081'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setMsg('')
    try {
      const res = await fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Signup failed')
      }
      setMsg('Signup successful! Please login.')
      setTimeout(()=>nav('/'), 1200)
    } catch (err) {
      setMsg(err.message || 'Error')
    }
  }

  return (
    <div className="card">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>Name
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label>Email
          <input value={email} onChange={e=>setEmail(e.target.value)} required />
        </label>
        <label>Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </label>
        <button type="submit">Signup</button>
        {msg && <p className="info">{msg}</p>}
      </form>
    </div>
  )
}
