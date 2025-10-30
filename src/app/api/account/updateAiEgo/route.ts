import { jwt } from "#/lib/auth";
import { UserAiEgoConfig } from "#/lib/mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {

    const token = (await cookies()).get(process.env.AUTH_COOKIE_TOKEN as string)?.value

    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const { userId } = await jwt.decryptToken(token as string)
    const { aiEgo } = await request.json()
    console.log({ userId, aiEgo })
    await UserAiEgoConfig.updateOne({ userId }, { aiEgo })

    return NextResponse.json({ message: "Success" }, { status: 200 })

}