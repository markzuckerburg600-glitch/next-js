"use client"
import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

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

export default function EventCard({ 
  title, 
  slug, 
  description, 
  image, 
  venue, 
  location, 
  date, 
  time, 
  mode, 
  audience, 
  tags, 
  index = 0
}: Omit<EventData, 'overview' | 'agenda' | 'organizer' | 'createdAt' | 'updatedAt'> & { index?: number }) {
  const transitionIndex = index
  return (
    <Link href={`/event/${slug}`}>
    <motion.div 
      id="event-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: transitionIndex * 0.1 }}
      className="glass card-shadow p-6 hover:scale-105 transition-transform duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 group">
        <Image 
          src={image} 
          alt={title} 
          width={400} 
          height={300}
          className="poster w-full h-75 object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </div>
      
      <h2 className="title text-gradient">{title}</h2>
      
      <p className="line-clamp-2 mb-3">{description}</p>
      
      {/* Datetime */}
      <div className="datetime mb-4 hover:bg-gray-700 rounded-lg p-2">
        <div className="flex items-center gap-2">
          <span className="text-primary">📅</span>
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary">Time</span>
          <span>{time} 🕐</span>
        </div>
      </div>
      {/* Location */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-primary">📍</span>
          <span className="text-sm">{venue}, {location}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="pill">{mode}</span>
        <span className="pill">{audience}</span>
      </div>
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string, tagIndex: number) => (
            <div key={tagIndex} className="flex items-center gap-1">
              <code className="text-xs px-3 py-1 bg-blue-500 rounded-full border border-blue-400 text-white hover:bg-blue-600 transition-colors cursor-pointer">
                {tag.trim()}
              </code>
            </div>
          ))}
        </div>
      )}
    </motion.div>
    </Link>
  )
}
