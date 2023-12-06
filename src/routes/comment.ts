import { Comment } from '@prisma/client';
import express from 'express'
import { createComment, deleteComment, getComment, updateComment } from '../services/commentService';

const comment = express()

comment.post('/create/:postId', async (req, res) => {
    const { accessToken, comment } = req.body
    const { postId } = req.params
    const commentResult: Comment | null = await createComment(accessToken, comment, postId)
    if (!commentResult) {
        res.status(400).send({ msg: 'Cannot create comment', check: false })
    }
    res.status(201).send({ comment: commentResult, msg: 'Comment created correctly!', check: true })
})


comment.get('/user/:id', async (req, res) => {
    const { accessToken } = req.body;
    const{id} = req.params;
    const commentResult: Comment | null = await getComment(id, accessToken);
    if (!commentResult) {
        res.status(400).send({ msg: 'Cannot get the list of comments', check: false })
    }
    res.status(200).send({ comment: commentResult, msg: 'List of comments found!', check: true })
})


comment.put('/update/:id', async(req, res) => {
    const {accessToken, comment}= req.body;
    const {id}= req.params;
    const commentResult: Comment | null = await updateComment(id, accessToken, comment);
    if (!commentResult) {
        res.status(400).send({ msg: 'Cannot change comment', check: false })
    }
    res.status(200).send({ comment: commentResult, msg: 'Comment changed correctly!', check: true })
})


comment.delete('/delete/:id', async (req, res) => {
    const { accessToken } = req.body;
    const { id } = req.params;
    const commentResult: Comment | null = await deleteComment(id, accessToken);
    if (!commentResult) {
        res.status(400).send({ msg: 'Cannot delete comment', check: false })
    }
    res.status(200).send({ msg: 'Comment deleted correctly', comment: commentResult, check: true })
})


export { comment }