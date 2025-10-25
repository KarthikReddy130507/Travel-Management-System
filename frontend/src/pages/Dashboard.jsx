import { useEffect, useState } from 'react'
const API = import.meta.env.VITE_API_URL || 'http://localhost:8081'

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    async function load() {
      try {
        const token = localStorage.getItem('token') || ''
        const res = await fetch(`${API}/dashboard`, {
          headers: { Authorization: token ? `Bearer ${token}` : '' }
        })
        if (!res.ok) throw new Error('Failed to fetch dashboard')
        const j = await res.json()
        setData(j)
      } catch (err) {
        setError(err.message || 'Error')
      }
    }
    load()
  },[])

  return (
    <div className="card">
      <h2>Dashboard - Travel Modules</h2>
      {error && <p className="error">{error}</p>}
      {data ? (
        <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(data, null, 2)}</pre>
      ) : <p>Loading...</p>}
    </div>
  )
}
