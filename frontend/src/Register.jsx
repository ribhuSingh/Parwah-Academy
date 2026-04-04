import React, { useState } from 'react'
import Input from './components/ui/input'
import Button from './components/ui/button'
import Card from './components/ui/card'

export default function Register({ onRegister }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      onRegister(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="auth-card">
      <h2 className="mb-4 text-3xl font-semibold text-slate-950">Create account</h2>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="pt-2">
          <Button type="submit" className="w-full">
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </div>
        {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
      </form>
    </Card>
  )
}
