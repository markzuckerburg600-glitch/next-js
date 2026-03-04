"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { trackEvent } from "@/lib/posthog"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  eventId: string
  eventTitle: string
  onRegistrationSuccess: () => void
}

export default function RegistrationModal({ 
  isOpen, 
  onClose, 
  eventId, 
  eventTitle,
  onRegistrationSuccess 
}: RegistrationModalProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Track registration attempt
      trackEvent("event_registration_attempt", {
        eventId,
        eventTitle,
        email: email.toLowerCase()
      })

      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          email: email.toLowerCase()
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Track successful registration
        trackEvent("event_registration_success", {
          eventId,
          eventTitle,
          email: email.toLowerCase()
        })

        setSuccess(true)
        onRegistrationSuccess()
        
        // Close modal after success
        setTimeout(() => {
          onClose()
          setSuccess(false)
          setEmail("")
        }, 2000)
      } else {
        // Track registration error
        trackEvent("event_registration_error", {
          eventId,
          eventTitle,
          error: data.message,
          email: email.toLowerCase()
        })

        setError(data.message)
      }
    } catch {
      // Track unexpected error
      trackEvent("event_registration_error", {
        eventId,
        eventTitle,
        error: "Network error",
        email: email.toLowerCase()
      })

      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    // Track modal close
    trackEvent("registration_modal_closed", {
      eventId,
      eventTitle
    })
    onClose()
    setSuccess(false)
    setError("")
    setEmail("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Register for Event</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 mb-2">Event: <span className="text-white font-medium">{eventTitle}</span></p>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Registration Successful!</h3>
            <p className="text-gray-300">You&apos;re all set for this event.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/30 rounded-lg p-4"
              >
                <p className="text-red-300 text-sm">{error}</p>
              </motion.div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !email}
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-medium"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}
