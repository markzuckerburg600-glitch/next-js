import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { Event } from "@/database/event.model";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    await connectToDB();
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
      message: "Internal server error" 
    }, { 
      status: 500 
    });
  }
}
