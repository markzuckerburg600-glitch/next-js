import Link from "next/link"
import React from "react"
import { Event } from "@/lib/constants"

export default function EventCard({ title, image, id, url, description, date, location, type, tags}: Event) {
  return (
    <div className = "hover:scale-105 transition-transform duration-200 border-2 border-gray-200 rounded-lg p-4 h-full flex flex-col">
      <Link href = {`/events/${id}`}>
        <div className = "poster">
          {React.createElement(image, { size: 40 })}
        </div>
        <h3>{title}</h3> <br/>

        <p className = "hover:text-blue-100 hover:scale-102 transition-transform duration-200"> {description}</p> <br/>
        {/* Optional url */}
        {url && <Link href={url} target="_blank" className = "text-blue-500 hover:underline">{url}</Link>}
        <p className = "text-gray-500 font-semibold hover:text-red-100 hover:scale-102 transition-transform duration-200"> {location} {date}</p>
        <p className = "mb-3 hover:underline hover:cursor-pointer hover:shadow-lg"> {tags.map((tag) => tag).join(', ')}</p> 
        <code className = "bg-blue-500 text-white px-2 py-1 rounded">{type}</code>
      </Link>
    </div>
  )
}
