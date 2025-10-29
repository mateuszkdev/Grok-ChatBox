import { jwt } from "#/lib/auth";
import { User } from "#/lib/mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {

    const token = (await cookies()).get(process.env.AUTH_COOKIE_TOKEN as string)?.value

    const access = await jwt.isAdmin(token as string)
    if (!access) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    const { action, _id } = await request.json();

    if (action == 'block') {
        await User.updateOne({ _id }, { active: false })
    } else {
        await User.updateOne({ _id }, { active: true })
    }

    return NextResponse.json({ message: "Done" }, { status: 200 })

}