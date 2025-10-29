import { NextResponse } from "next/server";
import { conncetDB, User } from "#/lib/mongoose";
import bcrypt from "bcrypt";
import { jwt, setAuthCookie } from "#/lib/auth";

export const POST = async (request: NextResponse) => {

    const { name, email, password, confirmPassword } = await request.json();

    await conncetDB();

    if (password !== confirmPassword) return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });

    const existing = await User.findOne({ email });
    if (existing) return NextResponse.json({ error: 'Email already in use' }, { status: 400 });

    const passwordHash = bcrypt.hashSync(password, 10);
    const id = crypto.randomUUID();

    await new User({
        _id: id,
        email,
        name,
        passwordHash,
        active: false
    }).save();

    const token = await jwt.createToken(id, { role: 'user', active: false });
    await setAuthCookie(token);
    
    return NextResponse.json({ message: 'Signup successful' }, { status: 201 });

}
