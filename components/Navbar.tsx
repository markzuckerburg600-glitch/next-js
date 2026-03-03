import Link from "next/link"
import Image from "next/image"
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

            <ul>
                <Link href="/">Home</Link>
                <Link href="/">Events</Link>
                <Link href="/">Create Event</Link>
            </ul>
        </nav>
    </header>
    </>
  )
}
