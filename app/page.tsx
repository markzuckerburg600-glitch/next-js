"use client"

import { useState, useEffect } from "react"
import ExploreBtn from "@/components/ExploreBtn"
import EventCard from "@/components/EventCard"
import EventSearch from "@/components/EventSearch"
import { motion } from "framer-motion"
import { trackEvent } from "@/lib/posthog"
import { IEvent } from "@/database/event.model"
import CreateNewButton from "@/components/CreateNewButton"


interface EventData {
  _id: string
  title: string
  slug: string
  description: string
  overview: string
  image: string
  venue: string
  location: string
  date: string
  time: string
  mode: string
  audience: string
  agenda: string[]
  organizer: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

type EventCardProps = Omit<EventData, 'overview' | 'agenda' | 'organizer' | 'createdAt' | 'updatedAt'> & { index?: number }

export default function Page() {
  const [events, setEvents] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/events', {
          next: { revalidate: 300 } // Cache for 5 minutes
        });
        const data = await response.json()
        setEvents(data.events || [])
        
        // Track page view
        trackEvent("home_page_view", {
          eventCount: data.events?.length || 0
        })
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div>
      <section>
        <motion.h1 
          className = "text-center text-4xl font-bold" 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Hub For Developers <br/> {"You can't miss this"} 
        </motion.h1>
        <motion.p 
          className = "text-center mt-5" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Hackathons, Meetups, and More!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ExploreBtn />
        </motion.div>
        <div className = "mt-20 space-y-7 flex flex-col items-center justify-center" id="events">
          <motion.h3 
            className = "text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Featured Events
          </motion.h3>

          {/* Search and Filter Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full max-w-6xl mx-auto"
          >
            <EventSearch 
              events={events as unknown as IEvent[]}
              onFilter={() => {}} // Client component, filtering handled client-side
              isLoading={loading}
            />
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-gray-300 text-center mb-4"
          >
            {loading ? (
              "Loading events..."
            ) : events.length === 0 ? (
              "No events found"
            ) : (
              `Showing ${events.length} events`
            )}
          </motion.div>

          {!loading && (
            <motion.ul 
              className = "events grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {events?.map((event: EventCardProps, i: number) => (
                <motion.li 
                  key={event._id} 
                  className = "list-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                >
                  <EventCard {...event} index={i} />
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>
        <div className="text-center">
          <CreateNewButton />
        </div>
      </section>
    </div>
  )
}
