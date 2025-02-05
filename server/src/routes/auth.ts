import express, { Request, Response, Router } from 'express'
import { JwtKey, User } from '@prisma/client'
import { getToken } from '../utils/key';
import bcrypt, { compareSync, hashSync } from 'bcrypt'
import dotenv from "dotenv"
import { prisma } from '../utils/prisma';
import { JwtPayload } from 'jsonwebtoken';
import { checkJwt } from '../services/checkJwt';
import { body, header } from 'express-validator';
import { validationMiddleware } from '../middlewares/validation';

dotenv.config();
const auth: Router = express.Router()


async function verifyUser(email: string, password: string): Promise<User | false> {
    const user: User | null = await prisma.user.findUnique({
        where: {
            email: email,
        },
        include: {
            post: true,
            comments: true,
            jwt: true
        }
    })
    if (!user) {
        return false
    }
    if (!compareSync(password, user.password)) {
        return false
    }
    return user
}

async function generateJwt(user: User): Promise<string> {
    const jwtKeys: JwtKey = await getToken(user);
    return jwtKeys.accessToken;
}




auth.post('/register',
    body('email').isEmail(),
    body('password').isString().isLength({ min: 5 }),
    body('firstName').isString(),
    body('surName').isString(),
    body('birthDate').isDate(),
    async (req: Request, res: Response) => {
        validationMiddleware(req, res);
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


auth.post('/login',
    body('email').isEmail(),
    body('password').isString().isLength({ min: 5 }),
    async (req: Request, res: Response) => {
        validationMiddleware(req, res);
        const { email, password } = req.body;
        const user: User | false = await verifyUser(email, password)
        if (!user) {
            return res.status(400).send({ msg: 'Authentication not valid', valid: false })
        }
        if (!compareSync(password, user.password)) {
            return null
        }
        const token: string = await generateJwt(user)
        return res.status(200).send({ msg: `Hello `, accessToken: token, valid: true })
    })


auth.post("/user",
    header("accessToken").isBase64(),
    async (req: Request, res: Response) => {
        validationMiddleware(req, res);
        const accessToken = req.headers.authorization
        const payload: JwtPayload | null = checkJwt(accessToken!);
        if (!payload) {
            return res.status(401).send({ msg: "Token not valid", valid: false });
        }
        const userId: string = payload.userId;
        const user: User | null = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                post: true,
                comments: true
            }
        });
        if (!user) {
            return res.status(401).send({ msg: "User not valid", valid: false });
        }
        return res.status(200).send({ name: user.firstName, id: user.id, valid: true });
    })

auth.get("/manager/user",
    header("accessToken").isBase64(),
    async (req: Request, res: Response) => {
        validationMiddleware(req, res)
        const accessToken = req.headers.authorization
        const payload: JwtPayload | null = checkJwt(accessToken!);
        if (!payload) {
            return res.status(401).send({ msg: "Token not valid", valid: false });
        }
        const userId: string = payload.userId;
        const user: User | null = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                post: true,
                comments: true
            }
        });
        if (!user) {
            return res.status(401).send({ msg: "User not valid", valid: false });
        }
        const getUser: User[] | null = await prisma.user.findMany({
            where: {
                id: userId
            },
            include: {
                comments: true,
                post: true
            }
        })
        if (!getUser) {
            return res.status(401).send({ msg: "User not valid", valid: false });
        }
        return res.status(200).send({ user: getUser, valid: true });
    })

auth.put("/editAccount",
    body("firstName").isString(),
    body("surName").isString(),
    header("accessToken").isBase64(),
    async (req: Request, res: Response) => {
        validationMiddleware(req, res)
        const { firstName, surName } = req.body;
        const accessToken = req.headers.authorization
        const payload: JwtPayload | null = checkJwt(accessToken!);
        if (!payload) {
            return res.status(401).send({ msg: "Token not valid", valid: false });
        }
        const userId: string = payload.userId;
        const user: User | null = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                post: true,
                comments: true
            }
        });
        if (!user) {
            return res.status(401).send({ msg: "User not valid", valid: false });
        }
        const editUser: User | null = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                firstName: firstName,
                surName: surName
            }
        })
        if (!editUser) {
            return res.status(401).send({ msg: "User not valid", valid: false });
        }
        return res.status(200).send({ user: editUser, valid: true });
    })


auth.delete('/deleteAccount',
    header("accessToken").isBase64(),
    async (req: Request, res: Response) => {
        validationMiddleware(req, res)
        const accessToken = req.headers.authorization
        const payload: JwtPayload | null = checkJwt(accessToken!);
        if (!payload) {
            return res.status(401).send({ msg: "Token not valid", valid: false });
        }
        const userId: string = payload.userId;
        const user: User | null = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(401).send({ msg: "User not valid", valid: false });
        }
        await prisma.jwtKey.deleteMany({
            where: {
                userId: user.id
            }
        })
        await prisma.post.deleteMany({
            where: {
                authorId: user.id
            }
        })
        await prisma.comment.deleteMany({
            where: {
                authorId: user.id
            }
        })
        const deleteUser: User | null = await prisma.user.delete({
            where: {
                id: user.id
            }
        })
        if (!deleteUser) {
            return res.status(500).send({ msg: "Internal server error.", valid: false });
        }
        return res.status(200).send({ msg: "Account deleted correctly.", valid: true });
    })


auth.put('/changepassword',
    body("newPassword").isString().isLength({ min: 5 }),
    body("repeatNewPassword").isString().isLength({ min: 5 }),
    header("accessToken").isBase64(),
    async (req: Request, res: Response) => {
        validationMiddleware(req, res)
        const { newPassword, repeatNewPassword } = req.body
        const accessToken = req.headers.authorization
        const payload: JwtPayload | null = checkJwt(accessToken!);
        if (!payload) {
            return res.status(401).send({ msg: "Token not valid", valid: false });
        }
        const userId: string = payload.userId;
        const user: User | null = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(401).send({ msg: "User not valid", valid: false });
        }
        if (newPassword !== repeatNewPassword) {
            return res.status(403).send({ msg: "Passwords must match.", valid: false });
        }
        const passwordHash: string = hashSync(newPassword, 5);
        const changePassword: User | null = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: passwordHash
            }
        })
        if (!changePassword) {
            return res.status(500).send({ msg: "Internal server error.", valid: false });
        }
        return res.status(200).send({ msg: "Password changed correctly.", valid: true });
    })



export { auth }




