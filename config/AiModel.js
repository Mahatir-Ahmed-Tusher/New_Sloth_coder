import { GoogleGenAI } from "@google/genai";
import Anthropic from '@anthropic-ai/sdk';

async function generateWithGemini(currPrompt, his = [], resType = "application/json") {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API key not found. Please set GEMINI_API_KEY environment variable.");
  }
  
  const ai = new GoogleGenAI({
    apiKey: apiKey,
  });
  const config = {
    responseMimeType: resType,
  };

  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history: his,
  });

  const response = await chat.sendMessage({
    message: currPrompt,
    config,
  });
  return response;
}

async function generateWithAnthropic(currPrompt, his = []) {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.NEXT_ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Anthropic API key not found. Please set ANTHROPIC_API_KEY environment variable.");
  }

  const anthropic = new Anthropic({
    apiKey: apiKey
  });

  const messages = his.length > 0 ? his : [];
  messages.push({ role: "user", content: currPrompt });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: messages
  });

  return response;
}

async function generateWithQwen(currPrompt, his = []) {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenRouter API key not found. Please set OPENROUTER_API_KEY environment variable.");
  }

  const messages = his.length > 0 ? his : [];
  messages.push({ role: "user", content: currPrompt });

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://init.new",
      "X-Title": "Init.new",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "qwen/qwen3-coder:free",
      messages: messages
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`OpenRouter API error: ${res.status} ${res.statusText} - ${errorText}`);
  }

  return await res.json();
}

async function generateWithDeepSeek(currPrompt, his = []) {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.NEXT_OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OpenRouter API key not found. Please set OPENROUTER_API_KEY environment variable.");
  }

  const messages = his.length > 0 ? his : [];
  messages.push({ role: "user", content: currPrompt });

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": "https://init.new",
      "X-Title": "Init.new",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-r1-0528:free",
      messages: messages
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`OpenRouter API error: ${res.status} ${res.statusText} - ${errorText}`);
  }

  return await res.json();
}

export default async function getAiResponse(
  currPrompt,
  his = [],
  resType = "application/json",
  model = "gemini"
) {
  switch (model) {
    case "anthropic":
      return await generateWithAnthropic(currPrompt, his);

    case "qwen":
      return await generateWithQwen(currPrompt, his);

    case "deepseek":
      return await generateWithDeepSeek(currPrompt, his);

    case "gemini":
    default:
      return await generateWithGemini(currPrompt, his, resType);
  }
}
