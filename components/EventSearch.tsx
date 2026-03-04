"use client"
import { useState } from "react"
import { IEvent } from "@/database/event.model"

interface EventSearchProps {
  events: IEvent[]
  onFilter: (filteredEvents: IEvent[]) => void
  isLoading?: boolean
}

const meetingTypes = [
  { value: "all", label: "All Events" },
  { value: "online", label: "Online Events" },
  { value: "offline", label: "In-Person Events" },
  { value: "hybrid", label: "Hybrid Events" },
  { value: "hackathon", label: "Hackathons" },
  { value: "meetup", label: "Meetups" },
  { value: "workshop", label: "Workshops" },
  { value: "conference", label: "Conferences" }
]


export default function EventSearch({ events, onFilter, isLoading = false }: EventSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState(meetingTypes[0])
  const [selectedAudience, setSelectedAudience] = useState<{ value: string; label: string } | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Generate search suggestions based on existing events
  const generateSuggestions = (term: string): string[] => {
    if (!term.trim()) return []
    
    const lowerTerm = term.toLowerCase()
    const allTags = Array.from(new Set(events.flatMap(event => event.tags || [])))
    const allTitles = events.map(event => event.title.toLowerCase())
    const allDescriptions = events.map(event => event.description.toLowerCase())
    
    const suggestions = new Set<string>()
    
    // Add exact matches first
    allTitles.forEach(title => {
      if (title.includes(lowerTerm) && title !== lowerTerm) {
        suggestions.add(title)
      }
    })
    
    // Add partial matches
    allTitles.forEach(title => {
      if (title.includes(lowerTerm) && title !== lowerTerm) {
        const words = title.split(' ')
        words.forEach(word => {
          if (word.includes(lowerTerm) && word.length >= 3) {
            suggestions.add(word)
          }
        })
      }
    })
    
    // Add tag matches
    allTags.forEach(tag => {
      if (tag.toLowerCase().includes(lowerTerm) && tag.toLowerCase() !== lowerTerm) {
        suggestions.add(tag)
      }
    })
    
    return Array.from(suggestions).slice(0, 12)
  }

  const audienceOptions = Array.from(new Set(events.map(event => event.audience)))
    .filter(Boolean)
    .map(audience => ({ value: audience.toLowerCase(), label: audience }))

  const suggestions = generateSuggestions(searchTerm)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    applyFilters(term, selectedType.value, selectedAudience?.value)
  }

  const handleTypeFilter = (selected: { value: string; label: string } | null) => {
    const type = selected || meetingTypes[0]
    setSelectedType(type)
    applyFilters(searchTerm, type.value, selectedAudience?.value)
  }

  const handleAudienceFilter = (selected: { value: string; label: string } | null) => {
    setSelectedAudience(selected)
    applyFilters(searchTerm, selectedType.value, selected?.value)
  }

  const applyFilters = (search: string, type: string, audience: string | undefined) => {
    let filtered = events

    // Search by title, description, overview, tags
    if (search.trim()) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.overview.toLowerCase().includes(searchLower) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Filter by event type/mode
    if (type !== 'all') {
      filtered = filtered.filter(event => {
        // Check if mode matches
        if (event.mode.toLowerCase() === type.toLowerCase()) {
          return true
        }
        // Check if tags contain the type
        return event.tags.some(tag => tag.toLowerCase().includes(type.toLowerCase()))
      })
    }

    // Filter by audience
    if (audience) {
      filtered = filtered.filter(event => 
        event.audience.toLowerCase() === audience
      )
    }

    onFilter(filtered)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedType(meetingTypes[0])
    setSelectedAudience(null)
    onFilter(events)
  }

  return (
    <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/50 shadow-2xl shadow-blue-500/10 mb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60"></div>
      
      <div className="space-y-6">
        {/* Search Input with Suggestions */}
        <div className="relative group ml-4">
          <label className="block text-sm font-semibold text-gray-200 mb-4 tracking-wide">Search Events</label>
          <div className="relative max-w-4xl">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-blue-400/50 text-base"
            />
            {/* Animated search line */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left"></div>
            
            {/* Search Suggestions Dropdown */}
            {searchTerm && suggestions.length > 0 && showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs text-gray-500 mb-2 px-2 font-medium">Suggestions</div>
                  {suggestions.slice(0, 10).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleSearch(suggestion)
                        setShowSuggestions(false)
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded transition-colors text-gray-700 text-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {suggestion}
                    </button>
                  ))}
                  {suggestions.length > 10 && (
                    <button
                      onClick={() => setShowSuggestions(false)}
                      className="w-full text-center px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors text-sm border-t border-gray-100"
                    >
                      Show more results...
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event Type Filter */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-200 mb-4 tracking-wide">Event Type</label>
            <div className="relative">
              <select
                value={selectedType.value}
                onChange={(e) => {
                  const selected = meetingTypes.find(type => type.value === e.target.value) || meetingTypes[0]
                  handleTypeFilter(selected)
                }}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-blue-400/50 appearance-none cursor-pointer"
              >
                {meetingTypes.map(type => (
                  <option key={type.value} value={type.value} className="bg-gray-800 text-white">
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse opacity-75"></div>
            </div>
          </div>

          {/* Audience Filter */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-200 mb-4 tracking-wide">Target Audience</label>
            <div className="relative">
              <select
                value={selectedAudience?.value || ''}
                onChange={(e) => {
                  const selected = e.target.value ? { value: e.target.value, label: e.target.value } : null
                  handleAudienceFilter(selected)
                }}
                disabled={isLoading || audienceOptions.length === 0}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-blue-400/50 appearance-none cursor-pointer"
              >
                <option value="">Select audience...</option>
                {audienceOptions.map(audience => (
                  <option key={audience.value} value={audience.value} className="bg-gray-800 text-white">
                    {audience.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {audienceOptions.length === 0 && (
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-gray-500 rounded-full"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedType.value !== 'all' || selectedAudience) && (
        <div className="mt-8 flex items-center justify-between bg-gray-700/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex flex-wrap gap-4">
            {searchTerm && (
              <div className="group relative">
                <span className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border border-blue-400/30 rounded-full text-sm font-medium backdrop-blur-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  &quot;{searchTerm}&quot;
                </span>
                <button
                  onClick={() => {
                    setSearchTerm("")
                    applyFilters("", selectedType.value, selectedAudience?.value)
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {selectedType.value !== 'all' && (
              <div className="group relative">
                <span className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-300 border border-green-400/30 rounded-full text-sm font-medium backdrop-blur-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 12h10m-7 5h10" />
                  </svg>
                  {selectedType.label}
                </span>
                <button
                  onClick={() => {
                    setSelectedType(meetingTypes[0])
                    applyFilters(searchTerm, 'all', selectedAudience?.value)
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            {selectedAudience && (
              <div className="group relative">
                <span className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 border border-purple-400/30 rounded-full text-sm font-medium backdrop-blur-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 4.714M17 20v-2c0-.656-.126-1.283-.356-1.857" />
                  </svg>
                  {selectedAudience.label}
                </span>
                <button
                  onClick={() => {
                    setSelectedAudience(null)
                    applyFilters(searchTerm, selectedType.value, undefined)
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="group px-8 py-3 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 border border-red-400/30 rounded-xl hover:from-red-500/30 hover:to-red-600/30 transition-all duration-300 font-medium backdrop-blur-sm hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
          >
            <svg className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  )
}