import express, { Router } from 'express'
import {  JwtKey, User } from '@prisma/client'
import { getToken } from '../utils/key';
import bcrypt, { compareSync } from 'bcrypt'
import dotenv from "dotenv"
import { prisma } from '../utils/prisma';
import { userInfo } from 'os';

dotenv.config();
const auth: Router = express.Router()


async function verifyUser (email: string, password: string) :Promise<User | false>{
    const user: User | null = await prisma.user.findUnique({
        where: {
            email: email,
        },
        include: {
            post: true,
            comments: true,
            jwt:true
        }
    })
    if(! user){
        return false
    }
    if (!compareSync(password, user.password)) {
        return false
    }
    return user
}

async function generateJwt(user:User):Promise<string>{
    const jwtKeys:JwtKey = await getToken(user);
    return jwtKeys.accessToken;
}



auth.post('/register', async (req, res) => {
    const { email, password, firstName, surName, birthDate } = req.body;
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
        return res.status(400).send({ msg: 'Cannot create User', valid: false })
    }
    return res.status(201).send({ user: user, msg: 'User created!', valid: true })
})


auth.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user: User | false = await verifyUser(email, password)
    if (!user) {
        return res.status(400).send({ msg: 'Authentication not valid', valid: false })
    }
    if (!compareSync(password, user.password)) {
        return null
    }
    const token: string  = await generateJwt(user)
    return res.status(200).send({ msg: `Hello `, accessToken: token, valid: true })
})




export { auth }




