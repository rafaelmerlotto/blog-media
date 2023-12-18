import React, { useEffect, useState } from 'react'
import Logout from '../components/Logout';
import { appService } from '../services';
import { useAuth } from '../auth/auth';
import CreatePost from '../components/CreatePost';


export default function Blog() {
  const [contents, setContents] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    async function getPosts() {
      const posts = await appService.posts(auth.token)
      setContents(posts)
    }
    getPosts();
  },[])

 

  async function createPosts(accessToken, title, body){
    const createPost = await appService.createPost(accessToken, title, body)
    console.log(accessToken)
    setContents(createPost)
  }
 

  return (
    <div>
      <Logout />
      <CreatePost onCreate={(title, body) => createPosts(auth.token, title, body)} />

      <h1>Welcome to the Blog</h1>
      
    </div>
  )
}
