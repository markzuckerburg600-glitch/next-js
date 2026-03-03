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

            <ul className="flex space-x-6">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/">Events</Link></li>
                <li><Link href="/">Create Event</Link></li>
            </ul>
        </nav>
    </header>
    </>
  )
}
