import { NextRequest, NextResponse } from "next/server";
import { jwt } from "#/lib/auth";

export const middleware = async (request: NextRequest) => {

    const token = request.cookies.get(`${process.env.AUTH_COOKIE_TOKEN}`)?.value
    if (!token) return NextResponse.redirect(new URL("/login", request.url))

    const check = await jwt.checkSession(token)
    if (!check) return NextResponse.redirect(new URL("/login", request.url))

    return NextResponse.next()

}

export const config = {
    matcher: ["/chat/:path*"]
}