import React, { useEffect, useState } from 'react'
import { appPostService, authService } from '../services';
import { useAuth } from '../auth/auth';
import CreatePost from '../components/CreatePost';
import Contents from '../components/Contents';
import Header from '../components/Header';



export default function Blog() {

  const [contents, setContents] = useState([]);
  const [user, setUser] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuth();

  useEffect(() => {
    async function getPosts() {
      const posts = await appPostService.posts()
      return setContents(posts.post)
    }
    getPosts();
  }, [contents])


  async function createPosts(accessToken, title, body) {
    const createPost = await appPostService.createPost(accessToken, title, body)
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
      <h2 className='timeline-title' style={{ textAlign: "center", color: "#757f9a" }}>My Blog Post</h2>
      {contents.map((e) => (
        <>   
            <Contents
              key={e.id}
              id={e.id}
              title={e.title}
              body={e.body}
              authorId={e.authorId}
              authorName={e.authorName}
              createTime={e.createTime}
              comments={e.comments}
              firstName={user}
            />
        </>
      ))}
    </div>
  )
}


