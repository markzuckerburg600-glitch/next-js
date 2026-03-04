"use client"
import axios from "axios"
import { useState } from "react"
import EventModal from "./EventModal"
import { IEvent } from "@/database/event.model"

export default function CreateNewButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = async (eventData: IEvent) => {
    try {
      // Send JSON data (not form-data)
      await axios.post("/api/events", eventData)
      setIsModalOpen(false)
      
      // Refresh page to show new event
      window.location.reload()
    } catch (error) {
      console.error("Error creating event:", error)
    }
  }

  return (
    <div className = "flex justify-center align-middle flex-col items-center">
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors mt-10"
        onClick={() => setIsModalOpen(true)}
      >
        <p className="text-lg font-semibold">Create New Event</p>
      </button>

      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
