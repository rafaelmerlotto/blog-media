import { Comment } from '@prisma/client';
import express, { Router } from 'express'
import { createComment, deleteComment, getComment, updateComment } from '../services/commentService';

const comment:Router = express.Router()

comment.post('/create/:postId', async (req, res) => {
    const {authorId, accessToken, comment } = req.body
    const { postId } = req.params
    const commentResult: Comment | null = await createComment(authorId,accessToken, comment, postId)
    if (!commentResult) {
       return res.status(400).send({ msg: 'Cannot create comment', check: false })
    }
    return res.status(201).send({ comment: commentResult, msg: 'Comment created correctly!', check: true })
})


comment.get('/user/:id', async (req, res) => {
    const {authorId, accessToken } = req.body;
    const{id} = req.params;
    const commentResult: Comment | null = await getComment(id,authorId, accessToken);
    if (!commentResult) {
        return  res.status(400).send({ msg: 'Cannot get the list of comments', check: false })
    }
    return res.status(200).send({ comment: commentResult, msg: 'List of comments found!', check: true })
})


comment.put('/update/:id', async(req, res) => {
    const {authorId, accessToken, comment}= req.body;
    const {id}= req.params;
    const commentResult: Comment | null = await updateComment(id,authorId, accessToken, comment);
    if (!commentResult) {
        return   res.status(400).send({ msg: 'Cannot change comment', check: false })
    }
    return res.status(200).send({ comment: commentResult, msg: 'Comment changed correctly!', check: true })
})


comment.delete('/delete/:id', async (req, res) => {
    const { authorId, accessToken } = req.body;
    const { id } = req.params;
    const commentResult: Comment | null = await deleteComment(id,authorId, accessToken);
    if (!commentResult) {
        return  res.status(400).send({ msg: 'Cannot delete comment', check: false })
    }
    return res.status(200).send({ msg: 'Comment deleted correctly', comment: commentResult, check: true })
})


export { comment }