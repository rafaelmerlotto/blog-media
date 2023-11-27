import { Comment, User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { checkJwt } from "./authService";
import { prisma } from "../utils/prisma";


export async function createComment(accessToken: string, commentText: string, postId: string): Promise<Comment | null> {
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
    const comment: Comment | null = await prisma.comment.create({
        data:{
            comment: commentText,
            postId: postId,
            authorId: user!.id,
            authorName: user!.firstName
        }
    })
    if (!comment) {
        throw new Error("Bad request, post cannot create!");
    }
    return comment
}