import { Post, User } from "@prisma/client";
import { prisma } from "../utils/prisma";
import { JwtPayload } from "jsonwebtoken";
import { checkJwt } from "./authService";


export async function createPost(title: string, body: string, accessToken: string): Promise<Post | any> {

    const payload: JwtPayload | null = checkJwt(accessToken);
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
            authorId: user!.id
        },
    })
    if (!post) {
        throw new Error("Post cannot create!");
    }
    return post
}

