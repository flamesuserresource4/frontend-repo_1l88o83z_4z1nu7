import React, { useState } from 'react'

export default function NewIdeaForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [maker, setMaker] = useState('')
  const [website, setWebsite] = useState('')
  const [tags, setTags] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!title || !description || !maker) return
    onCreate({ title, description, maker, website: website || undefined, tags: tags? tags.split(',').map(t=>t.trim()).filter(Boolean): [], thumbnail: thumbnail || undefined })
    setTitle(''); setDescription(''); setMaker(''); setWebsite(''); setTags(''); setThumbnail('')
  }

  return (
    <form onSubmit={submit} className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
        <input value={maker} onChange={(e)=>setMaker(e.target.value)} placeholder="Maker" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
      </div>
      <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Short description" rows={3} className="w-full px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={website} onChange={(e)=>setWebsite(e.target.value)} placeholder="Website (optional)" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
        <input value={thumbnail} onChange={(e)=>setThumbnail(e.target.value)} placeholder="Thumbnail URL (optional)" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
        <input value={tags} onChange={(e)=>setTags(e.target.value)} placeholder="Tags: ai, mobile" className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700 text-white placeholder:text-slate-400" />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">Post idea</button>
      </div>
    </form>
  )
}
