"use client"
import Link from "next/link"
import React from "react"
import { motion } from "framer-motion"
import { Event } from "@/lib/constants"

export default function EventCard({ title, image, id, url, description, date, location, type, tags}: Event) {
  return (
    <motion.div 
      className = "hover:scale-105 transition-transform duration-200 border-2 border-gray-900 rounded-lg p-4 h-full flex flex-col bg-gray-800"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Link href = {`/events/${id}`}>
        <motion.div 
          className = "poster"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Image */}
          {React.createElement(image, { size: 40 })}
        </motion.div>
        <h3>{title}</h3> <br/>

        <motion.p 
          className = "hover:text-blue-100 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
        >
          {description}
        </motion.p> <br/>
        {/* Optional url */}
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className = "text-blue-500 block mb-2">
            {url}
          </a>
        )}
        <p className = "text-gray-500 font-semibold hover:text-red-100 transition-colors duration-200"> {location} {date}</p> 
        <br/>

        {/* tags */}
        <div className = "mb-3 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href={`/events/tag/${tag.toLowerCase()}`}
                className = "inline-block bg-orange-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-600 transition-colors"
              >
                {tag}
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.code 
          className = "bg-blue-500 text-white px-2 py-1 rounded"
          whileHover={{ scale: 1.05 }}
        >
        {type}
        </motion.code>
      </Link>
    </motion.div>
  )
}
