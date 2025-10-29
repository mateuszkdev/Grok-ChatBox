import JWT from '#/lib/jwt'
import { cookies } from 'next/headers'

export const jwt = new JWT(process.env.JWT_SECRET as string)

export const setAuthCookie = async (token: string) => {

    (await cookies()).set(`${process.env.AUTH_COOKIE_TOKEN}`, token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 3 // 3 days
    })

}

export const clearAuthCookie = async () => {

    (await cookies()).delete(`${process.env.AUTH_COOKIE_TOKEN}`)

}