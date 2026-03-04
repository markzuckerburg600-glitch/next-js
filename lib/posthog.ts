import posthog from 'posthog-js'

let posthogClient: typeof posthog | null = null

export function getPostHog() {
  if (typeof window === 'undefined') {
    return null
  }

  if (!posthogClient && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthogClient = posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: true,
    })
  }

  return posthogClient
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  const client = getPostHog()
  if (client) {
    client.capture(eventName, properties)
  }
}

export function identifyUser(userId: string, properties?: Record<string, unknown>) {
  const client = getPostHog()
  if (client) {
    client.identify(userId, properties)
  }
}

export function resetUser() {
  const client = getPostHog()
  if (client) {
    client.reset()
  }
}
