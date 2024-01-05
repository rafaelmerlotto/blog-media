import { Post, User } from '@prisma/client';
import express, { Router } from 'express'
import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../utils/prisma';
import { checkJwt } from '../services/checkJwt';


const app: Router = express.Router();


app.post("/create", async (req, res) => {
  const { title, body } = req.body
  const accessToken = req.headers.authorization
  const payload: JwtPayload | null = checkJwt(accessToken!);
  if (!payload) {
    return res.status(401).send({ msg: "Token not valid", valid: false });
  }

  const userId: string = payload.userId
  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  })
  if (!user) {
    return res.status(401).send({ msg: "User not valid", valid: false });
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


app.get('/posts/user', async (req, res) => {
  const accessToken = req.headers.authorization
  const payload: string | JwtPayload | null = checkJwt(accessToken!);
  if (!payload) {
    return res.status(401).send({ msg: "Token not valid", valid: false });
  }
  const userId: string = payload!.userId

  const user: User | null = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      post: true,
      comments: true,
      jwt: true
    }
  })
  if (!user) {
    return res.status(401).send({ msg: "User not valid", valid: false });
  }

  const posts: Post[] | Post | null = await prisma.post.findMany({
    where: {
      authorId: user.id,

    },
    include: {
      comments: true
    },
    orderBy:{
      createTime: 'desc'
    }
  })


  if (!posts) {
    return res.status(404).send({ msg: 'List of post not found', valid: false })
  }
  return res.status(200).send({ msg: 'List of post found', post: posts, valid: true })
})


app.get('/posts', async (req, res) => {

  const post: Post[] | null = await prisma.post.findMany({
    include: {
      comments: true
    },
    orderBy:{
      createTime: 'desc'
    }
  })

  if (!post) {
    return res.status(404).send({ msg: 'List of post not found', valid: false })
  }
  return res.status(200).send({ msg: 'List of post found', post: post, valid: true })
})




app.put("/update/:id", async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;
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
  const post: Post | null = await prisma.post.update({
    where:{
      id: id
    },
    data:{
      title: title,
      body: body,
      createTime: new Date()
    }
  })
  if (!post) {
    return res.status(400).send({ msg: 'Cannot change post', valid: false })
  }
  return res.status(200).send({ msg: 'Post Changed correctly', post: post, valid: true })
})


app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
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

  const post: Post | null = await prisma.post.delete({
    where: {
      id: id,
      authorId: user.id
    },

    include: {
      comments: true
    }
  })
  await prisma.comment.deleteMany({
    where: {
      postId: post.id
    }
  })


  if (!post) {
    return res.status(400).send({ msg: 'Cannot delete post', valid: false })
  }
  return res.status(200).send({ msg: 'Post deleted correctly', post: post, valid: true })
})

export { app }




