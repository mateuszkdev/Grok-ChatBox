import { EncryptJWT, JWTPayload, jwtDecrypt } from 'jose'

export default class JWT {

    private key: Uint8Array

    constructor (key: string) {
        this.key = Uint8Array.from(Buffer.from(key)).slice(0, 32)
    }

    public async createToken(userId: string, payload: JWTPayload): Promise<string> {

        return await new EncryptJWT({
            userId, ...payload
        })
            .setProtectedHeader({ alg: process.env.JWT_ALG as string, enc: process.env.JWT_ENC as string, secret: process.env.JWT_SECRET as string })
            .setIssuedAt(Date.now())
            .setIssuer(process.env.JWT_ISSUER as string)
            .encrypt(this.key)

    }

    public async checkSession(token: string): Promise<boolean> {

        const { payload } = await jwtDecrypt(token, this.key, {
            issuer: process.env.JWT_ISSUER as string
        })
        return !!payload.userId

    }

    public async decryptToken(token: string): Promise<JWTPayload> {

        const { payload } = await jwtDecrypt(token, this.key, {
            issuer: process.env.JWT_ISSUER as string
        })
        return payload

    }

}