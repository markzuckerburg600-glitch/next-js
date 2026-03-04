import { connectToDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Booking } from "@/database/booking.model";

// Handle CORS preflight requests
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
}

// Handle POST registration
export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        
        const body = await req.json();
        const { eventId, email } = body;

        // Validate required fields
        if (!eventId || !email) {
            return NextResponse.json({ 
                message: "Event ID and email are required" 
            }, { 
                status: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            });
        }

        // Check if user already registered for this event
        const existingRegistration = await Booking.findOne({ eventId, email });
        if (existingRegistration) {
            return NextResponse.json({ 
                message: "You have already registered for this event" 
            }, { 
                status: 409,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            });
        }

        // Create new registration
        const registration = await Booking.create({ eventId, email });
        
        return NextResponse.json({ 
            message: "Registration successful", 
            registration 
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ 
            message: "Internal server error" 
        }, { 
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    }
}

// Handle GET to count registrations
export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        
        const { searchParams } = new URL(req.url);
        const eventId = searchParams.get('eventId');

        if (!eventId) {
            return NextResponse.json({ 
                message: "Event ID is required" 
            }, { 
                status: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                }
            });
        }

        // Count registrations for this event
        const registrationCount = await Booking.countDocuments({ eventId });
        
        return NextResponse.json({ 
            registrationCount 
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    } catch (error) {
        console.error("Registration count error:", error);
        return NextResponse.json({ 
            message: "Internal server error" 
        }, { 
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    }
}
