"use client"
import { useState } from "react"

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (eventData: any) => void
  isSubmitting?: boolean
  submitError?: string | null
}

export default function EventModal({ isOpen, onClose, onSubmit, isSubmitting = false, submitError = null }: EventModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [overview, setOverview] = useState("")
  const [image, setImage] = useState("")
  const [venue, setVenue] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [mode, setMode] = useState("")
  const [audience, setAudience] = useState("")
  const [organizer, setOrganizer] = useState("")
  const [tags, setTags] = useState("")
  const [agenda, setAgenda] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const eventData = {
      title,
      description,
      overview,
      image,
      venue,
      location,
      date,
      time,
      mode,
      audience,
      agenda: agenda.split('\n').filter(item => item.trim()),
      organizer,
      tags: tags.split(',').map(tag => tag.trim())
    }
    
    onSubmit(eventData)
    
    // Reset form
    setTitle("")
    setDescription("")
    setOverview("")
    setImage("")
    setVenue("")
    setLocation("")
    setDate("")
    setTime("")
    setMode("")
    setAudience("")
    setOrganizer("")
    setTags("")
    setAgenda("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="glass card-shadow rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-dark-200/50 animate-slideUp">
        <div className="flex justify-between items-center mb-8 p-6 border-b border-dark-200/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-cyan-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gradient">Create New Event</h2>
          </div>
          <button 
            className="w-10 h-10 rounded-xl bg-dark-200/50 hover:bg-dark-200/70 text-light-200 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitError && (
          <div className="mx-6 mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Event Title *
              </label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 placeholder:text-light-200/50 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Event Date *
              </label>
              <input 
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Event Time *
              </label>
              <input 
                type="time" 
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Event Location *
              </label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter event location"
                className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 placeholder:text-light-200/50 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Event Venue *
              </label>
              <input 
                type="text" 
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Enter event venue"
                className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 placeholder:text-light-200/50 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Event Mode *
              </label>
              <select 
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 text-white"
                required
              >
                <option value="" className="bg-dark-200">Select mode</option>
                <option value="online" className="bg-dark-200">Online</option>
                <option value="offline" className="bg-dark-200">In-Person</option>
                <option value="hybrid" className="bg-dark-200">Hybrid</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Event Image URL *
              </label>
              <input 
                type="url" 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 placeholder:text-light-200/50 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Event Organizer *
              </label>
              <input 
                type="text" 
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="Enter organizer name"
                className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 placeholder:text-light-200/50 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Target Audience *
              </label>
              <input 
                type="text" 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g., Developers, Designers, Students"
                className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 placeholder:text-light-200/50 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Event Description *
            </label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of your event"
              rows={4}
              className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 placeholder:text-light-200/50 text-white resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Event Overview *
            </label>
            <textarea 
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              placeholder="Brief overview (1-2 sentences)"
              rows={2}
              className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 placeholder:text-light-200/50 text-white resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Event Agenda *
            </label>
            <textarea 
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              placeholder="Enter agenda items (one per line)"
              rows={4}
              className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 placeholder:text-light-200/50 text-white resize-none"
              required
            />
            <p className="text-sm text-light-200/60 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Enter each agenda item on a new line
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-light-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              Event Tags *
            </label>
            <input 
              type="text" 
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, javascript, web-development"
              className="w-full p-3 bg-dark-200/50 border border-dark-200/50 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200 placeholder:text-light-200/50 text-white"
              required
            />
            <p className="text-sm text-light-200/60 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Separate tags with commas
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-dark-200/30">
            <button 
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-dark-200/50 hover:bg-dark-200/70 border border-dark-200/50 rounded-xl text-light-100 hover:text-white transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-black font-semibold rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 shadow-lg shadow-primary/25"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
