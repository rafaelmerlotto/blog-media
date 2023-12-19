import { JwtKey, Post, User } from "@prisma/client";
import { prisma } from "../utils/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import { checkJwt } from "./checkJwt";










// export  function checkJwt(accessToken:string): JwtPayload|null{
//     console.log("access Token",accessToken)
//     try{
//         const payload:string|JwtPayload =  jwt.verify(accessToken,<string>process.env.JWT_PRIVATE);
//         if(!payload){
//             return null;
//         }
//         if(typeof payload === "string"){
//             return null;
//         }
//         return <JwtPayload>payload;
//     }catch(error){
//         return null;
//     }
// }

// export async function createPost( accessToken: string, title: string, body: string): Promise<Post  | null> {
    
//     const payload:string| JwtPayload |null = checkJwt(process.env.ACCESS_TOKEN_DEV!);
//     console.log("payload",payload)
//     const userId: string  = payload!.userId
//     console.log(userId)
//     const user: User | null = await prisma.user.findUnique({
//         where: {
//             id: userId,
            
            
//         }
//     })
 
//     const post: Post | null = await prisma.post.create({
//         data: {
//             title: title,
//             body: body,
//             createTime: new Date(),
//             authorId: user!.id,
//             authorName: user!.firstName
//         },
//     })

//     if (!post) {
//         return null
//     }
//     return post
// }


// export async function getPost(accessToken: string): Promise<User | null> {
    
//     const payload:string| JwtPayload |null = checkJwt(accessToken);
      
//         const userId: string  = payload!.userId
   
//     const user: User | null = await prisma.user.findUnique({
//         where: {
//             id: userId,
//         },
//         include: {
//             post:true,
//             comments: true,
//             jwt:true
//         }
//     })
//     if (!user) {
//         return null
//     }
//     const posts: Post[] | null | any  = await prisma.post.findMany({
//         where:{
//             authorId: user.id,
//             authorName: user.firstName
//         }
//     })
//     if(!posts){
//         return null
//     }
//     return posts
    
// }


// export async function getPostUser(authorId: string, accessToken: string): Promise<Post | null> {

//     await prisma.user.findUnique({
//         where: {
//             id: authorId
//         }
//     })
//     const post: Post | any = await prisma.post.findMany({
//         where: {
//             authorId: authorId,

//         },
//         include: {
//             comments: true
//         }
//     })
//     if (!post) {
//         return null
//     }
//     return post
// }




// export async function updatePost(id: string, authorId: string, accessToken: string, title: string, body: string): Promise<Post | null> {

//     await prisma.user.findUnique({
//         where: {
//             id: authorId
//         }
//     })
//     const post: Post | null = await prisma.post.update({
//         where: {
//             id: id
//         },
//         data: {
//             title: title,
//             body: body
//         }
//     })
//     if (!post) {
//         return null
//     }
//     return post
// }


// export async function deletePost(id: string, authorId: string, accessToken: string): Promise<Post | null> {

//     await prisma.user.findUnique({
//         where: {
//             id: authorId
//         }
//     })
//     const post: Post | null = await prisma.post.delete({
//         where: {
//             id: id
//         }
//     })
//     if (!post) {
//         return null
//     }
//     return post
// }



