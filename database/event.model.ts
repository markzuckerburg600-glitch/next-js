import mongoose, { Schema, Document } from 'mongoose'

// Interface for Event document
export interface IEvent extends Document {
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
  createdAt: Date
  updatedAt: Date
}

// Event schema definition
const EventSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [1, 'Title cannot be empty']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [1, 'Description cannot be empty']
  },
  overview: {
    type: String,
    required: [true, 'Overview is required'],
    trim: true,
    minlength: [1, 'Overview cannot be empty']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
    minlength: [1, 'Image URL cannot be empty']
  },
  venue: {
    type: String,
    required: [true, 'Venue is required'],
    trim: true,
    minlength: [1, 'Venue cannot be empty']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    minlength: [1, 'Location cannot be empty']
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
    trim: true,
    minlength: [1, 'Date cannot be empty']
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
    trim: true,
    minlength: [1, 'Time cannot be empty']
  },
  mode: {
    type: String,
    required: [true, 'Mode is required'],
    trim: true,
    minlength: [1, 'Mode cannot be empty']
  },
  audience: {
    type: String,
    required: [true, 'Audience is required'],
    trim: true,
    minlength: [1, 'Audience cannot be empty']
  },
  agenda: {
    type: [String],
    required: [true, 'Agenda is required'],
    validate: {
      validator: function(agenda: string[]) {
        return agenda.length > 0
      },
      message: 'Agenda cannot be empty'
    }
  },
  organizer: {
    type: String,
    required: [true, 'Organizer is required'],
    trim: true,
    minlength: [1, 'Organizer cannot be empty']
  },
  tags: {
    type: [String],
    required: [true, 'Tags are required'],
    validate: {
      validator: function(tags: string[]) {
        return tags.length > 0
      },
      message: 'Tags cannot be empty'
    }
  }
}, {
  timestamps: true // Enable automatic createdAt and updatedAt
})

// Pre-save hook for slug generation and data normalization
EventSchema.pre('save', async function(next) {
  const event = this as any
  
  // Only regenerate slug if title has changed
  if (this.isModified('title') || this.isNew) {
    // Generate URL-friendly slug from title
    const baseSlug = event.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim()
    
    // Ensure slug is unique
    let uniqueSlug = baseSlug
    let counter = 1
    
    while (await mongoose.models.Event?.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter}`
      counter++
    }
    
    event.slug = uniqueSlug
  }
  
  // Normalize date to ISO format
  if (this.isModified('date') || this.isNew) {
    const dateObj = new Date(event.date)
    if (!isNaN(dateObj.getTime())) {
      event.date = dateObj.toISOString().split('T')[0] // YYYY-MM-DD format
    }
  }
  
  // Normalize time format (ensure HH:MM format)
  if (this.isModified('time') || this.isNew) {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(event.time)) {
      // Try to parse and format time
      const timeParts = event.time.match(/(\d{1,2}):?(\d{2})?/)
      if (timeParts) {
        const hours = timeParts[1].padStart(2, '0')
        const minutes = (timeParts[2] || '00').padStart(2, '0')
        event.time = `${hours}:${minutes}`
      }
    }
  }
  
  next()
})

// Add unique index to slug
EventSchema.index({ slug: 1 }, { unique: true })

// Create and export the Event model
export const Event = mongoose.model<IEvent>('Event', EventSchema)
