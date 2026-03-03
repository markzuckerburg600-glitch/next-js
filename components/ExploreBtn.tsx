"use client"
import { ArrowDown } from "lucide-react"

export default function ExploreBtn() {
  return (
    <div>
      <button type = "button" id = "explore-btn" className = "mt-7 mx-auto">
        <a href = "#events">
          Explore Events
          <ArrowDown size={24} />
        </a>
      </button>
    </div>
  )
}
