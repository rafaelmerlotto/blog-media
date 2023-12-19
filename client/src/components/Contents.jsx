import React from 'react'

export default function Contents({ post, children }) {

  const { id, title, body, authorName } = post;
  return (
    <div>
      <p className='itemList' key={id} >
        <h1>{title}</h1>
        <h3>{body}</h3>
        <p>{authorName}</p>
        {children}
      </p>
    </div>
  )

}