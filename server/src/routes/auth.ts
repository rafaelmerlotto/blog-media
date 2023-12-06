import express from 'express'
import {  loginUser, registerUser } from '../services/authService'
import { JwtKey, User } from '@prisma/client'
import { getToken } from '../utils/key';

const auth = express()


async function generateJwt(user:User | null | any):Promise<string>{
    const jwtKeys:JwtKey = await getToken(user);
    return jwtKeys.accessToken;
}


auth.post('/register', async (req, res) => {
    const { email, password, firstName, surName, birthDate } = req.body;
    const user: User | null = await registerUser(email, password, firstName, surName, birthDate);
    if (!user) {
        res.status(400).send({ msg: 'Cannot create User', check: false })
    }
    res.status(201).send({ user: user, msg: 'User created!', check: true })
})


auth.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user: User | null = await loginUser(email, password);
    if (!user || ! password) {
        res.status(401).send({ msg: 'Authentication invalid', check: false })
    }
    const token: string = await generateJwt(user)
    res.status(200).send({ msg: `Hello ${user?.firstName}`,accessToken:token, check: true })
})



export { auth }



