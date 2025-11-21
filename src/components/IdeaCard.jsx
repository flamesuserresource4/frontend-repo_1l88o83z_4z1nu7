import React from 'react'
import { ArrowBigUp } from 'lucide-react'

export default function IdeaCard({ idea, onUpvote, onComment }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 flex gap-4 hover:border-blue-500/40 transition-colors">
      <img src={idea.thumbnail || `https://picsum.photos/seed/${idea.title}/100/100`} alt={idea.title} className="w-16 h-16 rounded-lg object-cover" />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-white font-semibold text-lg">{idea.title}</h3>
            <p className="text-blue-200/80 text-sm">by {idea.maker}</p>
          </div>
          <button onClick={() => onUpvote(idea)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-sm">
            <ArrowBigUp size={18} />
            {idea.upvotes}
          </button>
        </div>
        <p className="text-blue-100/90 mt-2 text-sm">{idea.description}</p>
        {idea.tags?.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {idea.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-slate-700 text-blue-200/90">#{t}</span>
            ))}
          </div>
        )}
        {idea.comments?.length > 0 && (
          <div className="mt-3 text-xs text-blue-300/80">
            {idea.comments.length} comment{idea.comments.length !== 1 ? 's' : ''}
          </div>
        )}
        <div className="mt-3">
          <button onClick={() => onComment(idea)} className="text-sm text-blue-300 hover:text-white">Add comment</button>
          {idea.website && (
            <a href={idea.website} target="_blank" rel="noreferrer" className="ml-4 text-sm text-blue-400 hover:text-white">Visit</a>
          )}
        </div>
      </div>
    </div>
  )
}
