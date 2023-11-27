import { Comment } from '@prisma/client';
import express from 'express'
import { createComment } from '../services/commentService';

const comment = express()

comment.post('/create/:postId', async(req, res) => {
    const { accessToken, comment } = req.body
    const {postId} = req.params
    const commentResult: Comment | null = await createComment(accessToken,comment, postId)
    if (!commentResult) {
        res.status(400).send({ msg: 'Cannot create post', check: false })
    }
    res.status(201).send({ post: commentResult, msg: 'Post created correctly!', check: true })
})



export {comment}