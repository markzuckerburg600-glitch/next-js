import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Event } from "@/database/event.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDB();
    const { slug } = await params;
    
    // Find event by slug
    const event = await Event.findOne({ slug });
    
    if (!event) {
      return NextResponse.json({ 
        message: "Event not found" 
      }, { 
        status: 404 
      });
    }
    
    return NextResponse.json({ event });
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
