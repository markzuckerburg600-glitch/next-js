import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/database/event.model";

// Handle JSON POST event
export async function POST(req: NextRequest) {
    try {
        await connectToDB();

        // Handle JSON data
        const body = await req.json();
        const event = body;

        // Validate required fields
        const requiredFields = ['title', 'description', 'overview', 'image', 'venue', 'location', 'date', 'time', 'mode', 'audience', 'agenda', 'organizer', 'tags'];
        const missingFields = requiredFields.filter(field => !event[field]);
        
        if (missingFields.length > 0) {
            return NextResponse.json({ 
                message: `Missing required fields: ${missingFields.join(', ')}` 
            }, { 
                status: 400 
            });
        }

        const createdEvent = await Event.create(event);
        
        return NextResponse.json({ 
            message: "Event created successfully", 
            event: createdEvent 
        });
    } catch (error) {
        console.error("Event creation error:", error);
        return NextResponse.json({ 
            message: "Internal server error", 
            error: error instanceof Error ? error.message : "Unknown error" 
        }, { 
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export async function GET() {
    try {
        await connectToDB();
        // Sort by newest first
        const events = await (Event.find()).sort({ createdAt: -1 });
        return NextResponse.json({ events });
    } catch (error) {
        console.error("Event retrieval error:", error);
        return NextResponse.json({ 
            message: "Internal server error", 
            error: error instanceof Error ? error.message : "Unknown error" 
        }, { 
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}