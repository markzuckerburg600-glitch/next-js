"use client"

import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import RegistrationModal from "@/components/RegistrationModal";
import { trackEvent } from "@/lib/posthog";

// Dynamic import to ensure client-side only
const DynamicMotion = typeof window !== 'undefined' ? motion : null;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

const getEventBySlug = async (slug: string) => {
  const response = await fetch(`${BASE_URL}/api/events/${slug}`, { 
    next: { revalidate: 3600 },
    cache: 'force-cache'
  });
  const data = await response.json();
  return data
};

const getRegistrationCount = async (eventId: string) => {
  const response = await fetch(`${BASE_URL}/api/events/register?eventId=${eventId}`, {
    next: { revalidate: 60 }, // Revalidate registration count more frequently
    cache: 'no-store' // Don't cache registration count to keep it real-time
  });
  const data = await response.json();
  return data.registrationCount || 0;
};

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedParams = await params;
        const eventSlug = resolvedParams.slug;
        
        const eventData = await getEventBySlug(eventSlug);
        setData(eventData);
        
        // Get registration count
        if (eventData.event?._id) {
          const count = await getRegistrationCount(eventData.event._id);
          setRegistrationCount(count);
        }

        // Track page view
        trackEvent("event_page_view", {
          eventSlug,
          eventTitle: eventData.event?.title
        });
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  const handleRegistrationSuccess = () => {
    // Refresh registration count
    if (data?.event?._id) {
      getRegistrationCount(data.event._id).then(setRegistrationCount);
    }
  };

  const handleRegisterClick = () => {
    trackEvent("registration_button_clicked", {
      eventId: data.event._id,
      eventTitle: data.event.title
    });
    setIsRegistrationModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!data?.event) {
    notFound();
    return null;
  }

  // Only render motion components on client side
  if (!DynamicMotion) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-white text-center py-20">
          <h1 className="text-4xl font-bold mb-4">{data.event.title}</h1>
          <p className="text-xl text-gray-300">Loading event details...</p>
        </div>
      </div>
    );
  }
  
  const { 
    audience, 
    date, 
    description, 
    title, 
    location, 
    mode, 
    image, 
    tags, 
    overview, 
    organizer, 
    time, 
    venue,
    agenda 
  } = data.event;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section with Image */}
      <DynamicMotion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-96 overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>
        
        <DynamicMotion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative container mx-auto px-4 h-full flex items-center justify-center pb-8"
        >
          <div className="text-center max-w-4xl">
            <DynamicMotion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2 mb-6 justify-center"
            >
              {Array.isArray(tags) && tags.map((tag: string, index: number) => (
                <DynamicMotion.span 
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-full text-sm backdrop-blur-sm cursor-pointer"
                >
                  #{tag}
                </DynamicMotion.span>
              ))}
            </DynamicMotion.div>
            <DynamicMotion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6 bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              {title}
            </DynamicMotion.h1>
            <DynamicMotion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="text-xl text-gray-300 max-w-3xl mx-auto"
            >
              {overview}
            </DynamicMotion.p>
          </div>
        </DynamicMotion.div>
      </DynamicMotion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description */}
            <DynamicMotion.section 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-white mb-4">About This Event</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {description}
              </p>
            </DynamicMotion.section>

            {/* Agenda */}
            <DynamicMotion.section 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Agenda</h2>
              <div className="space-y-4">
                {Array.isArray(agenda) && agenda.map((item: string, index: number) => (
                  <DynamicMotion.div 
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 cursor-pointer group"
                  >
                    <DynamicMotion.div 
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    >
                      {index + 1}
                    </DynamicMotion.div>
                    <p className="text-gray-300 text-lg group-hover:text-white transition-colors duration-200">{item}</p>
                  </DynamicMotion.div>
                ))}
              </div>
            </DynamicMotion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Event Details Card */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-6">Event Details</h3>
              
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <motion.div 
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-blue-400">📅</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-white font-medium">{date}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <motion.div 
                    whileHover={{ rotate: -15 }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-blue-400">🕐</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="text-white font-medium">{time}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <motion.div 
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-blue-400">📍</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400">Venue</p>
                    <p className="text-white font-medium">{venue}</p>
                    <p className="text-gray-400 text-sm">{location}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <motion.div 
                    whileHover={{ rotate: -15 }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-blue-400">🌐</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400">Mode</p>
                    <p className="text-white font-medium capitalize">{mode}</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <motion.div 
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-blue-400">👥</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400">Audience</p>
                    <p className="text-white font-medium">{audience}</p>
                  </div>
                </motion.div>

                {/* Registration Count */}
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <motion.div 
                    whileHover={{ rotate: 15 }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-green-400">✅</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400">Registered</p>
                    <p className="text-white font-medium">{registrationCount} people</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <motion.div 
                    whileHover={{ rotate: -15 }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center"
                  >
                    <span className="text-blue-400">🎤</span>
                  </motion.div>
                  <div>
                    <p className="text-sm text-gray-400">Organizer</p>
                    <p className="text-white font-medium">{organizer}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRegisterClick}
              className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform shadow-lg hover:shadow-blue-500/50"
            >
              Register for Event
            </motion.button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        eventId={data.event._id}
        eventTitle={data.event.title}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    </div>
  )
}
