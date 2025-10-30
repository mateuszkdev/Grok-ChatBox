import { convertToModelMessages, streamText } from 'ai';
import { xai } from '@ai-sdk/xai';
import { UserAiEgoConfig } from "#/lib/mongoose";
import { jwt } from "#/lib/auth"
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {

  const { messages } = await request.json();

  const modelMessages = convertToModelMessages(messages);

  const token = (await cookies()).get(process.env.AUTH_COOKIE_TOKEN as string)?.value
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const { userId } = await jwt.decryptToken(token as string)
  const { aiEgo } = await UserAiEgoConfig.findOne({ userId })

  const result = streamText({
    model: xai('grok-4-fast'),
    system: aiEgo,
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();

}