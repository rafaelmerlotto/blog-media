import React from 'react'
import { useForm } from 'react-hook-form'
import { appCommentService } from '../services';

export default function UpdateComment({ commentId, comment, children }) {

    const { register, handleSubmit } = useForm();
    const onSubmit = (comment) => {
        appCommentService.updateComment(commentId, comment)
    }

    const handleClick= () => {
        appCommentService.iCommentId = commentId;
        console.log(commentId)
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" defaultValue={comment} onClick={handleClick} {...register("comment")} />
            <input hidden value={commentId} type="text" {...register('commentId')} />
            <button type='submit' className='btn-createComment'>Save</button>
            {children}
        </form>
    )
}
