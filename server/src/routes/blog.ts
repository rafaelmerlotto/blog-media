import { Post, User } from '@prisma/client';
import express, { Router } from 'express'
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../utils/prisma';
import { checkJwt } from '../services/checkJwt';
import { getPost } from '../services/blogService';

const app: Router = express.Router();


app.post("/create", async (req, res) => {
  const {title, body } = req.body
  const accessToken = req.headers.authorization
  const payload: JwtPayload | null = checkJwt(accessToken!);
  if (!payload) {
    return res.status(401).send({ message: "Token not valid", valid: false });
  }

  const userId: string = payload.userId
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  })
  if (!user) {
    return res.status(401).send({ message: "User not valid", valid: false });
  }
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
    return res.status(400).send({ msg: 'Cannot create post', valid: false })
  }

  return res.status(201).send({ post: post, msg: 'Post created correctly!', valid: true })
})


app.get('/posts', async (req, res) => {
  const accessToken = req.headers.authorization

  console.log("access token", accessToken)


  const post: User | null = await getPost(accessToken!);
 
  if (!post) {
    return res.status(404).send({ msg: 'List of post not found', valid: false })
  }
  return res.status(200).send({ msg: 'List of post found', post: post,  valid: true })
})


// app.get('/post/user/:id', async (req, res) => {
//   const { accessToken } = req.body;
//   const { id } = req.params
//   console.log(accessToken)
//   const post: Post | null = await getPostUser(id, accessToken);
//   if (!post) {
//     return res.status(404).send({ msg: 'List of post not found', check: false })
//   }
//   return res.status(200).send({ msg: 'List of post found', post: post, check: true })
// })


// app.put("/update/:id", async (req, res) => {
//   const { authorId,accessToken, title, body } = req.body;
//   const { id } = req.params;
//   const post: Post | null = await updatePost(id,authorId, accessToken, title, body);
//   if (!post) {
//     return res.status(400).send({ msg: 'Cannot change post', check: false })
//   }
//   return res.status(200).send({ msg: 'Post Changed correctly', post: post, check: true })
// })


// app.delete('/delete/:id', async (req, res) => {
//   const { authorId, accessToken } = req.body;
//   const { id } = req.params;
//   const post: Post | null = await deletePost(id,authorId, accessToken);
//   if (!post) {
//     return res.status(400).send({ msg: 'Cannot delete post', check: false })
//   }
//   return res.status(200).send({ msg: 'Post deleted correctly', post: post, check: true })
// })

export { app }




