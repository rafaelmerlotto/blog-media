import React, { useEffect, useState } from 'react'
import { appService, authService } from '../services';
import { useAuth } from '../auth/auth';
import CreatePost from '../components/CreatePost';
import Contents from '../components/Contents';
import Header from '../components/Header';


export default function Blog() {
  const [contents, setContents] = useState([]);
  const [posts, setPosts] = useState("")
  const [message, setMessage] = useState()
  const [user, setUser] = useState("")


  const auth = useAuth();

  useEffect(() => {
    async function getPosts() {
      const posts = await appService.posts()
      return setContents(posts.post)
    }
    getPosts();
  }, [])


  async function createPosts(accessToken, title, body) {
    const createPost = await appService.createPost(accessToken, title, body)
    setContents(createPost)
  }


  async function dataUser(firstName) {
    const user = await authService.user(firstName)
    setUser(user)
  }
  dataUser()



  return (
    <div>
      <Header firstName={user} />
      <CreatePost firstName={user} onCreate={(title, body) => createPosts(auth.token, title, body)} />
      <h2 className='timeline-title' style={{textAlign:"center", color:"#757f9a"}}>My Blog Post</h2>
      {contents.map((e) => (
        <Contents post={e} />
      ))}
    </div>
  )
}


