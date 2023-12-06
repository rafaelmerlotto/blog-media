import { Post } from '@prisma/client';
import express from 'express'
import { createPost, deletePost, getPost, getPostUser, updatePost } from '../services/blogService';

const app = express();


app.post('/create', async (req, res) => {
    const { accessToken, title, body } = req.body
    const post: Post | null = await createPost(title, body, accessToken);
    if (!post) {
        res.status(400).send({ msg: 'Cannot create post', check: false })
    }
    res.status(201).send({ post: post, msg: 'Post created correctly!', check: true })
})


app.get('/post', async (req, res) => {
    const { accessToken } = req.body;
    console.log(accessToken)
    const post: Post | null = await getPost(accessToken);
    if (!post) {
        res.status(404).send({ msg: 'List of post not found', check: false })
    }
    res.status(200).send({ msg: 'List of post found', post: post, check: true })
})


app.get('/post/user/:id', async (req, res) => {
    const { accessToken } = req.body;
    const {id} = req.params
    console.log(accessToken)
    const post: Post | null = await getPostUser(id ,accessToken);
    if (!post) {
        res.status(404).send({ msg: 'List of post not found', check: false })
    }
    res.status(200).send({ msg: 'List of post found', post: post, check: true })
})

app.put("/update/:id", async (req, res) => {
    const { accessToken, title, body } = req.body;
    const { id } = req.params;
    const post: Post | null = await updatePost(id, accessToken, title, body);
    if (!post) {
        res.status(400).send({ msg: 'Cannot change post', check: false })
    }
    res.status(200).send({ msg: 'Post Changed correctly', post: post, check: true })
})


app.delete('/delete/:id', async (req, res) => {
    const { accessToken } = req.body;
    const { id } = req.params;
    const post: Post | null = await deletePost(id, accessToken);
    if (!post) {
        res.status(400).send({ msg: 'Cannot delete post', check: false })
    }
    res.status(200).send({ msg: 'Post deleted correctly', post: post, check: true })
})

export { app }




