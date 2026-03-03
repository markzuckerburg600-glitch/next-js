"use client"
import { ArrowDown } from "lucide-react"

export default function ExploreBtn() {
  return (
    <div className="mt-7 mx-auto flex flex-col items-center">
      <a href="#events" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Explore Events
        <ArrowDown size={24} className="flex-shrink-0" />
      </a>
    </div>
  )
}
