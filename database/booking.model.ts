import mongoose, { Schema, Document } from 'mongoose'
import { Event } from './event.model'

// Interface for Booking document
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId
  email: string
  createdAt: Date
  updatedAt: Date
}

// Booking schema definition
const BookingSchema: Schema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event ID is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(email: string) {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
      },
      message: 'Please provide a valid email address'
    }
  }
}, {
  timestamps: true // Enable automatic createdAt and updatedAt
})

// Pre-save hook to validate event existence
BookingSchema.pre('save', async function(next) {
  const booking = this as any // Use any for Mongoose document context
  
  // Check if the referenced event exists
  if (this.isModified('eventId') || this.isNew) {
    try {
      const event = await Event.findById(booking.eventId)
      if (!event) {
        const error = new Error('Referenced event does not exist')
        return next(error)
      }
    } catch (error) {
      return next(error as Error)
    }
  }
  
  next()
})

// Add index on eventId for faster queries
BookingSchema.index({ eventId: 1 })

// Create and export the Booking model with conditional export to prevent overwriting
export const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)
