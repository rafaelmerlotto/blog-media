import express, { Router } from 'express'
import {  JwtKey, User } from '@prisma/client'
import { getToken } from '../utils/key';
import bcrypt, { compareSync } from 'bcrypt'
import dotenv from "dotenv"
import { prisma } from '../utils/prisma';
import { userInfo } from 'os';
import { JwtPayload } from 'jsonwebtoken';
import { checkJwt } from '../services/checkJwt';

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


auth.post("/user",async(req,res) => {
    const accessToken = req.headers.authorization
    const payload:JwtPayload|null = checkJwt(accessToken!);
    if(!payload){
        return res.status(401).send({message:"Token not valid",valid:false});
    }
    const userId:string = payload.userId;
    const user:User|null = await prisma.user.findUnique({
        where:{
            id:userId
        }
    });
    if(!user){
        return res.status(401).send({message:"User not valid",valid:false});
    }
    return res.status(200).send({name:user.firstName,email:user.email,valid:true});
})

export { auth }




