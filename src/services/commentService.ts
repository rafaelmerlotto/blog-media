import { Comment, User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { checkJwt } from "./authService";
import { prisma } from "../utils/prisma";



export async function createComment(accessToken: string, commentText: string, postId: string): Promise<Comment | null> {
    const payload: JwtPayload | null = checkJwt(process.env.ACCESS_TOKEN_DEV!);
    if (!payload) {
        throw new Error("Token not valid");
    }
    const userId: string = payload.userId
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    await prisma.user.findUnique({
        where: {
            id: <string>payload.userId
        }
    })
    const comment: Comment | null = await prisma.comment.create({
        data: {
            comment: commentText,
            postId: postId,
            authorId: user!.id,
            authorName: user!.firstName
        }
    })
    if (!comment) {
        throw new Error("Bad request, comment cannot create!");
    }
    return comment
}


export async function getComment(id: string, accessToken: string): Promise<Comment | null> {
    const payload: JwtPayload | null = checkJwt(process.env.ACCESS_TOKEN_DEV!);
    if (!payload) {
        throw new Error("Token not valid");
    }
    await prisma.user.findUnique({
        where: {
            id: <string>payload.userId
        }
    })
    const comment: Comment | null = await prisma.comment.findFirst({
        where: {
            authorId: id
        },
        include: {
            post: true,
        }
    })
    if (!comment) {
        // throw new Error("Bad Request, cannot get the list of comments!");
        return null
    }
    return comment
}




export async function updateComment(id: string, accessToken: string, commentText: string): Promise<Comment | null> {
    const payload: JwtPayload | null = checkJwt(process.env.ACCESS_TOKEN_DEV!);
    if (!payload) {
        throw new Error("Token not valid");
    }
    await prisma.user.findUnique({
        where: {
            id: <string>payload.userId
        }
    })
    const comment: Comment | null = await prisma.comment.update({
        where: {
            id: id
        },
        data: {
            comment: commentText
        }
    })
    if (!comment) {
        return null
    }
    return comment
}



export async function deleteComment(id: string, accessToken: string):Promise<Comment | null>{
    const payload: JwtPayload | null = checkJwt(process.env.ACCESS_TOKEN_DEV!);
    if (!payload) {
        throw new Error("Token not valid");
    }
    await prisma.user.findUnique({
        where: {
            id: <string>payload.userId
        }
    })
    const comment: Comment | null = await prisma.comment.delete({
        where:{
            id: id
        }
    })
    if(!comment){
        throw new Error("Bad Request, cannot delete the post!");
    }
    return comment
}