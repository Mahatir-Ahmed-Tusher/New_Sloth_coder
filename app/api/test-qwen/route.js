import { NextResponse } from "next/server";
import getAiResponse from "@/config/AiModel";

export async function POST(req) {
  console.log("Testing Qwen model...");
  
  try {
    const { prompt } = await req.json();
    
    // Check environment variables
    const openrouterKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_OPENROUTER_API_KEY;
    console.log("OpenRouter API key available:", !!openrouterKey);
    
    if (!openrouterKey) {
      return NextResponse.json({ 
        error: "OpenRouter API key not configured" 
      }, { status: 500 });
    }
    
    // Test with a simple prompt
    const testPrompt = prompt || "Hello, can you help me with coding?";
    const testMessages = [];
    
    console.log("Testing Qwen with prompt:", testPrompt);
    const response = await getAiResponse(testPrompt, testMessages, "text/plain", "qwen");
    
    console.log("Qwen test successful");
    return NextResponse.json({ 
      success: true, 
      response: response.choices[0].message.content,
      model: "qwen"
    });
    
  } catch (error) {
    console.error("Qwen test error:", error);
    return NextResponse.json({ 
      error: error.message,
      details: error.toString()
    }, { status: 500 });
  }
}

export async function GET() {
  const openrouterKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_OPENROUTER_API_KEY;
  
  return NextResponse.json({
    openrouterKeyConfigured: !!openrouterKey,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}
