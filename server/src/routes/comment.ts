import { Comment, Post, User } from '@prisma/client';
import express, { Router } from 'express'

import { prisma } from '../utils/prisma';
import { JwtPayload } from 'jsonwebtoken';
import { checkJwt } from '../services/checkJwt';

const comment: Router = express.Router()

comment.post('/create/:postId', async (req, res) => {
    const { comment } = req.body
    const { postId } = req.params
    const accessToken = req.headers.authorization
    const payload: string | JwtPayload | null = checkJwt(accessToken!);
    if (!payload) {
        return res.status(401).send({ message: "Token not valid", valid: false });
    }
    const userId: string = payload!.userId
    const user: User | null = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    const post: Post | null = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    const commentResult: Comment | undefined = await prisma.comment.create({
        data: {
            comment: comment,
            postId: post!.id,
            authorId: user!.id,
            authorName: user!.firstName
        }
    })
    if (!commentResult) {
        return res.status(400).send({ msg: 'Cannot create comment', valid: false })
    }
    return res.status(201).send({ comment: commentResult, msg: 'Comment created correctly!', valid: true })
})


comment.get('/comments', async (req, res) => {

    const commentResult: Comment[] | null = await prisma.comment.findMany();
    if (!commentResult) {
        return res.status(400).send({ msg: 'Cannot get the list of comments', check: false })
    }
    return res.status(200).send({ comment: commentResult, msg: 'List of comments found!', check: true })
})


// comment.put('/update/:id', async (req, res) => {
//     const { authorId, accessToken, comment } = req.body;
//     const { id } = req.params;
//     const commentResult: Comment | null = await updateComment(id, authorId, accessToken, comment);
//     if (!commentResult) {
//         return res.status(400).send({ msg: 'Cannot change comment', check: false })
//     }
//     return res.status(200).send({ comment: commentResult, msg: 'Comment changed correctly!', check: true })
// })


// comment.delete('/delete/:id', async (req, res) => {
//     const { authorId, accessToken } = req.body;
//     const { id } = req.params;
//     const commentResult: Comment | null = await deleteComment(id, authorId, accessToken);
//     if (!commentResult) {
//         return res.status(400).send({ msg: 'Cannot delete comment', check: false })
//     }
//     return res.status(200).send({ msg: 'Comment deleted correctly', comment: commentResult, check: true })
// })


export { comment }