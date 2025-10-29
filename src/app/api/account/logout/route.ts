import { clearAuthCookie } from "#/lib/auth";
import { NextResponse } from "next/server";

export const POST = async (request: NextResponse) => {

    await clearAuthCookie();
    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });

}