"use client"
import Link from "next/link"
import React from "react"
import { motion } from "framer-motion"
import { Event } from "@/database/event.model"
import Image from "next/image"

export default function EventCard({ index, title, slug, description, overview, image, venue, location, date, time, mode, audience, agenda, organizer, tags, createdAt, updatedAt }: Event) {
  // Image is a URL so we can use it directly
  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{overview}</p>
      <Image src={image} alt={title} width={400} height={400}/>
      <p>{venue}</p>
      <p>{location}</p>
      <p>{date}</p>
      <p>{time}</p>
      <p>{mode}</p>
      <p>{audience}</p>
      <p>{agenda}</p>
      <p>{organizer}</p>
      <p>{tags}</p>
      <p>{createdAt}</p>
      <p>{updatedAt}</p>
    </div>
  )
}
