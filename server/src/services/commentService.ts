import { Comment, User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

import { prisma } from "../utils/prisma";



export async function createComment(authorId: string, accessToken: string, commentText: string, postId: string): Promise<Comment | null> {
   
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: authorId
        }
    })
    await prisma.user.findUnique({
        where: {
            id: authorId
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
        return null
    }
    return comment
}


export async function getComment(id: string, authorId: string, accessToken: string): Promise<Comment | null> {
    
    await prisma.user.findUnique({
        where: {
            id: authorId
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
        return null
    }
    return comment
}




export async function updateComment(id: string, authorId: string, accessToken: string, commentText: string): Promise<Comment | null> {
 await prisma.user.findUnique({
        where: {
            id: authorId
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



export async function deleteComment(id: string,authorId: string, accessToken: string):Promise<Comment | null>{
   
    await prisma.user.findUnique({
        where: {
            id:authorId
        }
    })
    const comment: Comment | null = await prisma.comment.delete({
        where:{
            id: id
        }
    })
    if(!comment){
        return null
    }
    return comment
}
