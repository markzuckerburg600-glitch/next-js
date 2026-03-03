import ExploreBtn from "@/components/ExploreBtn"
import EventCard from "@/components/EventCard"
import { upcomingEvents } from "@/lib/constants"


export default function page() {

  return (
    <div>
      <section>
        <h1 className = "text-center text-4xl font-bold"> 
          The Hub For Developers <br/> {"You can't miss this"} 
        </h1>
        <p className = "text-center mt-5"> Hackathons, Meetups, and More!</p>
        <ExploreBtn />
        <div className = "mt-20 space-y-7 flex flex-col items-center justify-center">
          <h3> Featured Events</h3>

          <ul className = "events grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {upcomingEvents.map((event, i) => (
              <li key={i} className = "list-none">
                <EventCard {...event}/>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
