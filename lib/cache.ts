import { cache } from 'react'
import { connectToDB } from './mongodb'
import { Event } from '@/database/event.model'
import { Booking } from '@/database/booking.model'

// Cached functions for data fetching
export const getEvents = cache(async () => {
  try {
    await connectToDB()
    const events = await Event.find().sort({ createdAt: -1 })
    return JSON.parse(JSON.stringify(events))
  } catch (error) {
    console.error("Error fetching events:", error)
    throw error
  }
})

export const getEventBySlug = cache(async (slug: string) => {
  try {
    await connectToDB()
    const event = await Event.findOne({ slug })
    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    console.error("Error fetching event by slug:", error)
    throw error
  }
})

export const getEventRegistrationCount = cache(async (eventId: string) => {
  try {
    await connectToDB()
    const count = await Booking.countDocuments({ eventId })
    return count
  } catch (error) {
    console.error("Error fetching registration count:", error)
    throw error
  }
})

export const getEventWithRegistrationCount = cache(async (slug: string) => {
  try {
    await connectToDB()
    const event = await Event.findOne({ slug })
    if (!event) return null
    
    const registrationCount = await Booking.countDocuments({ eventId: event._id })
    
    return {
      ...JSON.parse(JSON.stringify(event)),
      registrationCount
    }
  } catch (error) {
    console.error("Error fetching event with registration count:", error)
    throw error
  }
})
