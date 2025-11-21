import React, { useEffect, useMemo, useState } from 'react'
import IdeaCard from './components/IdeaCard'
import NewIdeaForm from './components/NewIdeaForm'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchIdeas = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/ideas`)
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setIdeas(data.map((d) => ({ ...d, id: d._id || d.id })))
    } catch (e) {
      setError('Could not load ideas. Try seeding data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  const createIdea = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/ideas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create')
      await fetchIdeas()
    } catch (e) {
      alert('Failed to post idea')
    }
  }

  const upvote = async (idea) => {
    try {
      await fetch(`${API_BASE}/ideas/${idea._id || idea.id}/upvote`, { method: 'POST' })
      await fetchIdeas()
    } catch (e) {
      alert('Upvote failed')
    }
  }

  const addComment = async (idea) => {
    const text = prompt('Add a comment:')
    if (!text) return
    const author = prompt('Your name:') || 'Anonymous'
    try {
      await fetch(`${API_BASE}/ideas/${idea._id || idea.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, text })
      })
      await fetchIdeas()
    } catch (e) {
      alert('Comment failed')
    }
  }

  const seed = async () => {
    try {
      await fetch(`${API_BASE}/seed`, { method: 'POST' })
      await fetchIdeas()
    } catch (e) {
      alert('Seed failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Idea Hunt</h1>
            <p className="text-blue-300/70">Post ideas, upvote, and discuss — Product Hunt style.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={fetchIdeas} className="px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700">Refresh</button>
            <button onClick={seed} className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500">Add mock data</button>
          </div>
        </header>

        <div className="mb-8">
          <NewIdeaForm onCreate={createIdea} />
        </div>

        {loading && <div className="text-blue-200">Loading ideas…</div>}
        {error && (
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-200 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id || idea.id} idea={idea} onUpvote={upvote} onComment={addComment} />
          ))}
          {!loading && ideas.length === 0 && (
            <div className="text-blue-300/70">No ideas yet. Be the first to post or add mock data.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
