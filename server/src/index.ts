import express from 'express'
import { auth } from './routes/auth';
import { app } from './routes/blog';
import { comment } from './routes/comment';

const server = express();
server.use(express.json())
server.use('/auth', auth)
server.use('/app', app)
server.use('/comment', comment)



const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`)
})



