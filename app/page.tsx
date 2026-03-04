"use client"
import ExploreBtn from "@/components/ExploreBtn"
import EventCard from "@/components/EventCard"
import { motion } from "framer-motion"
import { IEvent } from "@/database/event.model"
import { useState, useEffect } from "react"
import CreateNewButton from "@/components/CreateNewButton"
import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 

export default function Page() {
  const [events, setEvents] = useState<IEvent[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/events`);
        setEvents(response.data.events || [])
      } catch (error) {
        console.error("Failed to fetch events:", error)
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

          <motion.ul 
            className = "events grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {events?.map((event: IEvent, i: number) => (
              <motion.li 
                key={i} 
                className = "list-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <EventCard {...event} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
        <CreateNewButton />
      </section>
    </div>
  )
}
