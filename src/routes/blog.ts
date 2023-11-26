import { Post } from '@prisma/client';
import express from 'express'
import { createPost } from '../services/blogService';

const app = express();


app.post('/post/create', async (req, res) => {
    const {accessToken, title, body} = req.body
    const post: Post | null = await createPost(accessToken, title, body);
    if (!post) {
        res.status(400).send({ msg: 'Cannot create post', check: false })
    }
    res.status(201).send({ user: post, msg: 'Post created!', check: true })
})

export {app}

