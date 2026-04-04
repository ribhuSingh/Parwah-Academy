import React, { useState } from 'react'
import Input from './components/ui/input'
import Button from './components/ui/button'
import Card from './components/ui/card'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      onLogin(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="auth-card">
      <div className="mb-6">
        <p className="eyebrow">Authorized Personnel</p>
        <h2 className="text-3xl font-semibold text-slate-950">Sign in</h2>
        <p className="mt-2 text-sm text-slate-600">Use your admin credentials to continue.</p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <Input
            type="email"
            value={email}
            placeholder="admin@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="pt-2">
          <Button type="submit" className="w-full">
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </div>
        {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
      </form>
    </Card>
  )
}
