import { prisma } from "../utils/prisma";
import { User } from "@prisma/client";
import bcrypt, { compareSync } from 'bcrypt'
import jwt, { JwtPayload } from "jsonwebtoken";



export function checkJwt(accessToken: string): JwtPayload | null {
    try {
        const payload: string | JwtPayload = jwt.verify(accessToken, <string>process.env.JWT_PRIVATE);
        if (!payload) {
            return null;
        }
        if (typeof payload === "string") {
            return null;
        }
        return <JwtPayload>payload;
    } catch (error) {
        return null;
    }
}


export async function registerUser
    (email: string, password: string, firstName: string, surName: string, birthDate: string): Promise<User | null> {
    const passwordHash: string = bcrypt.hashSync(password, 5)
    const user: User | null = await prisma.user.create({
        data: {
            email: email,
            password: passwordHash,
            firstName: firstName,
            surName: surName,
            birthDate: birthDate
        }
    })
    if (!user) {
        throw new Error('Bad request, user cannot create!')
    }

    return user
}


export async function loginUser(email: string, password: string): Promise<User | null> {
    const user: User | null = await prisma.user.findUnique({
        where: {
            email: email,
        },
        include: {
            jwtKey: true,
            post: true,
            comments: true
        }
    })
    if (!user) {
         throw new Error('Bad request, User invalid!') 
    }
    if (!compareSync(password, user.password)) {
         throw new Error('Bad request, Password invalid!')
    }
    return user
}


