import { jwt, setAuthCookie } from "#/lib/auth";
import { conncetDB, User } from "#/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: NextResponse) => {

    const { email, password } = await request.json();

    await conncetDB();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    const valid = bcrypt.compareSync(password, user.passwordHash);
    if (!valid) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    const role = email === process.env.STATIC_ADMIN_EMAIL ? 'admin' : 'user';

    const token = await jwt.createToken(user._id, { role });
    await setAuthCookie(token);

    return NextResponse.json({ message: 'Login successful', userName: user.name }, { status: 200 });

}