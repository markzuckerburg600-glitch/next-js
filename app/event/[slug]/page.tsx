import axios from "axios";
import { notFound } from "next/navigation";
import { cache } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

// Cache the event data to avoid repeated API calls
const getEventBySlug = cache(async (slug: string) => {
  const response = await axios.get(`${BASE_URL}/api/events/${slug}`);
  return response.data;
});

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getEventBySlug(slug);

  if (!data.event) return notFound();
  
  const { audience, date, description, title, location, mode, image, tags, overview, organizer, createdAt } = data.event;

  return (
  <section>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 flex flex-col items-center justify-center">{title}</h1>
      <p className="text-center text-gray-600 mb-8">{description}</p>
    </div>
  </section>
  )
}
