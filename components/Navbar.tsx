import Link from "next/link"
import { Panda } from "lucide-react"

export default function Navbar() {
  return (
    <>
    <header>
        <nav>
            <Link href="/" className = "logo">
                <Panda size={24}/>
                <p> Dev Event</p>
            </Link>

            <ul className="flex space-x-6 list-none">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/events">Events</Link></li>
                <li><Link href="/events/create">Create Event</Link></li>
            </ul>
        </nav>
    </header>
    </>
  )
}
