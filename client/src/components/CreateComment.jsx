import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { appCommentService } from '../services';
import '../assets/css/createComment.css'


export default function CreateComment({ postId, children }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    return appCommentService.createComment(data)
  }

  const handleClick = () => {
    appCommentService.iPostId = postId
  }


  return (
    <>
      <form className='create-comment' onSubmit={handleSubmit(onSubmit)} >
        <textarea className='text-comment' rows="3" cols="100"  onClick={handleClick} placeholder='Comment' type="text" {...register('comment')} />
        <input hidden value={postId} type="text" {...register('postId')} />
        <button type='submit' className='btn-createComment'>Publish</button>

      </form>
      {children}
    </>
  )
}
