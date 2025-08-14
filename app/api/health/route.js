import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Check environment variables
    const geminiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY || process.env.NEXT_ANTHROPIC_API_KEY;
    const openrouterKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_OPENROUTER_API_KEY;
    const localUrl = process.env.NEXT_PUBLIC_LOCAL_URL;

    const healthStatus = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: {
        geminiApiKey: geminiKey ? "configured" : "missing",
        anthropicApiKey: anthropicKey ? "configured" : "missing",
        openrouterApiKey: openrouterKey ? "configured" : "missing",
        localUrl: localUrl || "not set"
      },
      apiKeys: {
        gemini: !!geminiKey,
        anthropic: !!anthropicKey,
        openrouter: !!openrouterKey
      }
    };

    return NextResponse.json(healthStatus);
  } catch (error) {
    return NextResponse.json({ 
      status: "error", 
      error: error.message 
    }, { status: 500 });
  }
}
