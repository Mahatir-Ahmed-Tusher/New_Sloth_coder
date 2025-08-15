import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_OPENROUTER_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: "OpenRouter API key not configured" 
      }, { status: 500 });
    }

    const response = await fetch("https://openrouter.ai/api/v1/models", {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://slothcoder.com",
        "X-Title": "Sloth Coder"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter for Qwen models
    const qwenModels = data.data.filter(model => 
      model.id.toLowerCase().includes('qwen')
    );

    return NextResponse.json({
      allModels: data.data.map(model => ({
        id: model.id,
        name: model.name,
        pricing: model.pricing
      })),
      qwenModels: qwenModels.map(model => ({
        id: model.id,
        name: model.name,
        pricing: model.pricing
      }))
    });

  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json({ 
      error: error.message 
    }, { status: 500 });
  }
}
