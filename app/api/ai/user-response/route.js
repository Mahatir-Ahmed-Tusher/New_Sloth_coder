import { NextResponse } from "next/server";
import getAiResponse from "@/config/AiModel";

export async function POST(req) {
  console.log("API route /api/ai/user-response called");
  
  try {
    const { messages, prompt, model } = await req.json();
    console.log("Request received:", { messagesLength: messages?.length, model });
    
    // Check environment variables
    const openrouterKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_OPENROUTER_API_KEY;
    console.log("OpenRouter API key available:", !!openrouterKey);
    
    if (model === "qwen" && !openrouterKey) {
      console.log("Qwen model requested but no OpenRouter API key found");
      return NextResponse.json({ 
        err: "OpenRouter API key not configured for Qwen model. Please set OPENROUTER_API_KEY environment variable." 
      }, { status: 500 });
    }

    if (!messages || !prompt) {
      console.log("Missing required fields");
      return NextResponse.json({ 
        err: "Missing required fields: messages and prompt are required" 
      }, { status: 400 });
    }

    // Format messages based on the model
    let formattedMessages;
    if (model === "anthropic") {
      formattedMessages = messages.map(({ content, role }) => ({
        role,
        parts: [{ text: content }],
      }));
    } else {
      // For Qwen, DeepSeek, and other models, use standard format
      formattedMessages = messages.map(({ content, role }) => ({
        role,
        content: content,
      }));
    }

    console.log("Calling getAiResponse with model:", model);
    const response = await getAiResponse(prompt, formattedMessages, "text/plain", model);
    console.log("AI response received for model:", model);
    
    // Handle different response formats based on the model
    let responseText;
    if (model === "anthropic") {
      responseText = response.content[0].text;
    } else if (model === "qwen" || model === "deepseek") {
      responseText = response.choices[0].message.content;
    } else {
      // Default Gemini format
      responseText = response.text;
    }
    
    console.log("Returning response");
    return NextResponse.json({ response: responseText });
  } catch (err) {
    console.error("AI Response Error:", err);
    
    // Check if it's an API key error
    if (err.message.includes("API key not found")) {
      return NextResponse.json({ 
        err: "API key not configured. Please check your environment variables." 
      }, { status: 500 });
    }
    
    // Check if it's a network or API error
    if (err.message.includes("fetch") || err.message.includes("network")) {
      return NextResponse.json({ 
        err: "Network error. Please check your internet connection and try again." 
      }, { status: 500 });
    }
    
    // Check if it's a model-specific error
    if (err.message.includes("not a valid model ID")) {
      return NextResponse.json({ 
        err: `Invalid model ID. Please check the model configuration. Error: ${err.message}` 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      err: err.message || "Error generating response" 
    }, { status: 500 });
  }
}
