import React, { useEffect, useState } from 'react'
import '../assets/css/contents.css'
import profilePic from '../assets/images/profile-pic.png'
import CreateComment from './CreateComment';
import ManagerPost from './ManagerPost';
import ManagerComment from './ManagerComment';


export default function Contents({ id, title, body,authorId, authorName, createTime, comments,firstName, children }) {

  const [contents, setContents] = useState([])

  useEffect(() => {
    setContents(comments)
  }, [])


  return (
    <div className='container-blogPost'  >
      <div className='content' key={id} >
        <ManagerPost postId={id} title={title} body={body}  authorId={authorId} />
        <div className='post'>
          <h2>{title}</h2>
          <p className='body'>{body}</p>
        </div>
        <div className='info'>
          <span> Author:&nbsp; <h3 className='imageProfile-contents'>{firstName[0]}</h3> &nbsp;{authorName} -
            published: {new Date(createTime).toLocaleDateString("it-IT")}, {new Date(createTime).toLocaleTimeString("it-IT", {
              hour12: false,
              timeZone: 'UTC',
              formatMatcher: "best fit",
              hour: 'numeric',
              minute: 'numeric'
            })}</span>
        </div>
        <CreateComment postId={id} key={id} />
        <h3>Comments</h3>
        {contents.map((e) => (
          <div className='info' key={e.id}>
            <hr />
            <ManagerComment commentId={e.id} comment={e.comment} authorId={e.authorId} />
            <p>{e.comment}</p>
            <span> Author:&nbsp; <h3 className='imageProfile-contents'>{e.authorName[0]}</h3> &nbsp;{e.authorName} -
              published: {new Date(e.createTime).toLocaleDateString("it-IT")},  {new Date(e.createTime).toLocaleTimeString("it-IT", {
                hour12: false,
                timeZone: 'UTC',
                formatMatcher: "best fit",
                hour: 'numeric',
                minute: 'numeric'
              })} </span>
          </div>
        ))}
      </div>
      {children}
    </div>
  )

}