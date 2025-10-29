import OpenAI from "openai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {

    const { prompt } = await request.json();

    if (!prompt) return NextResponse.json({ error: "Prompt is required" }, { status: 400 });

    const client = new OpenAI({
        apiKey: process.env.GROK_KEY,
        baseURL: "https://api.x.ai/v1"
    });

    const response = await client.responses.create({
        model: "grok-4-fast",
        input: prompt,
    })

    return NextResponse.json({ response: response.output_text }, { status: 200 });

}