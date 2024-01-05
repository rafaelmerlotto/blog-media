import React from 'react'
import { useForm } from 'react-hook-form';
import { appCommentService, appPostService } from '../services';

export default function UpdatePost({postId,title, body, children}) {

  

    const { register, handleSubmit } = useForm();
    const onSubmit = (title, body) => {
        appPostService.updatePost(postId, title, body)
    }

    const handleClick = () => {
        appCommentService.iPostId = postId
        console.log(postId)
      }

  return (
    <>
    <form className='create-comment' onSubmit={handleSubmit(onSubmit)} >
        <input defaultValue={title} onClick={handleClick} type="text" {...register("title")} />
      <textarea defaultValue={body} className='text-comment' rows="5" cols="100"  onClick={handleClick} placeholder='Comment' type="text" {...register('body')} />
      <input hidden value={postId} type="text" {...register('postId')} />
      <button type='submit' className='btn-createComment'>Save</button>

    </form>
    {children}
  </>
  )
}
