import { Post, User } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { JwtPayload } from "jsonwebtoken";
import { checkJwt } from "./authService";




export async function createPost(title: string, body: string, accessToken: string): Promise<Post | any> {
    const payload: JwtPayload | null = checkJwt(process.env.ACCESS_TOKEN_DEV2!);
    if (!payload) {
        throw new Error("Token not valid");
    }
    const userId: string = payload.userId
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    const post: Post | null = await prisma.post.create({
        data: {
            title: title,
            body: body,
            createTime: new Date(),
            authorId: user!.id,
            authorName: user!.firstName
        },
    })
    if (!post) {
        throw new Error("Bad request, post cannot create!");
    }
    return post
}


export async function getPost(accessToken: string): Promise<Post | null> {
    const payload: JwtPayload | null = checkJwt(process.env.ACCESS_TOKEN_DEV!);
    if (!payload) {
        throw new Error("Token not valid");
    }
    await prisma.user.findUnique({
        where: {
            id: <string>payload.userId
        }
    })
    const post: Post | any = await prisma.post.findFirst({
        where: {
            authorId: <string>payload.userId,
            
        },
        include:{
            comments: true
        }
    })
    if (!post) {
        throw new Error("Bad Request, cannot get the list!");
    }
    return post
}


export async function getPostUser(id: string, accessToken: string): Promise<Post | null> {
    const payload: JwtPayload | null = checkJwt(process.env.ACCESS_TOKEN_DEV!);
    if (!payload) {
        throw new Error("Token not valid");
    }
    await prisma.user.findUnique({
        where: {
            id: <string>payload.userId
        }
    })
    const post: Post | any = await prisma.post.findMany({
        where: {
            authorId: id,
            
        },
        include:{
            comments: true
        }
    })
    if (!post) {
        throw new Error("Bad Request, cannot get the list!");
    }
    return post
}




export async function updatePost(id: string,accessToken: string, title: string, body: string): Promise<Post | null> {
    const payload: JwtPayload | null = checkJwt(process.env.ACCESS_TOKEN_DEV!);
    if (!payload) {
        throw new Error("Token not valid");
    }
    await prisma.user.findUnique({
        where: {
            id: <string>payload.userId
        }
    })
    const post: Post | null = await prisma.post.update({
        where: {
            id: id
        },
        data: {
            title: title,
            body: body
        }
    })
    if(!post){
        throw new Error("Bad Request, cannot change the post!");
    }
    return post
}


export async function deletePost(id: string, accessToken: string):Promise <Post | null> {
    const payload: JwtPayload | null = checkJwt(process.env.ACCESS_TOKEN_DEV!);
    if (!payload) {
        throw new Error("Token not valid");
    }
    await prisma.user.findUnique({
        where: {
            id: <string>payload.userId
        }
    })
    const post: Post | null = await prisma.post.delete({
        where:{
            id: id
        }
    })
    if(!post){
        throw new Error("Bad Request, cannot delete the post!");
    }
    return post
}