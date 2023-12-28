import React, { useEffect, useState } from 'react'
import { get, useForm } from 'react-hook-form';
import { appCommentService, appPostService } from '../services';


export default function CreateComment({postId, children}) {

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    return appCommentService.createComment( data)
  }

const handleClick=() => {
  appCommentService.iPostId = postId
  console.log(postId)
}
 

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} >
          <input onClick={handleClick} placeholder='Comment' type="text" {...register('comment')} />
          <input hidden value={postId} type="text" {...register('postId')} />
          <button type='submit' className='btn-createPost'>Publish</button>

        </form>
        {children}
    </>


  )
}
