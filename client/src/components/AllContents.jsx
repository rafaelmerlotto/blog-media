import React from 'react'
import '../assets/css/contents.css'


export default function AllContents({post, children}) {
    const { id, title, body, authorName, createTime } = post;

  return (
    
  
      
     <div className='container-blogPost'  >
      <div className='content' key={id} >
        <div className='manager-post'>
          <button className='btn-managerPost'>Delete post</button>
          <button >Edit post</button>
        </div>

        <div className='post'>
          <h2>{title}</h2>
          <p className='body'>{body}</p>
          {children}
        </div>
        <div className='info'>
          <span>Author: {authorName} - published: {createTime} </span>
        </div>

        <h3>Comments</h3>
        <hr />
        <div className='comment'>
          <div className='manager-comment'>
            <button className='btn-managerComment'>Delete comment</button>
            <button >Edit comment</button>
          </div>
          <p>ullamcorper dui. Etiam eros urna, pretium vitae tellus non</p>
        </div>
        <div className='info'>
          <span> Author: Test -published: 03/31/2023 </span>
        </div>
        <hr></hr>
        <div className='comment'>
          <div className='manager-comment'>
            <button className='btn-managerComment'>Delete comment</button>
            <button >Edit comment</button>
          </div>
          <p>ullamcorper dui. Etiam eros urna, pretium vitae tellus non</p>
        </div>
        <div className='info'>
          <span> Author: Test -published: 03/31/2023 </span>

        </div>

      </div>

    </div>
   

   
  
  )
}


