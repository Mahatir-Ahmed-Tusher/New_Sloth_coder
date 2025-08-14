import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    message: "API routes are working!",
    timestamp: new Date().toISOString()
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    return NextResponse.json({ 
      message: "POST request received",
      data: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      error: "Invalid JSON in request body",
      timestamp: new Date().toISOString()
    }, { status: 400 });
  }
}
