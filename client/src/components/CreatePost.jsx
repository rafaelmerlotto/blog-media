import React from 'react'
import { useForm } from 'react-hook-form';
import { appPostService } from '../services';
import '../assets/css/createPost.css'

export default function CreatePost({onCreate, firstName, children}) {

   
  
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        appPostService.createPost(data)
    }
    return (

        <form className='createPost' onSubmit={handleSubmit(onSubmit)}>
            <h3>Would you like to publish a post, {firstName}?</h3>
            <input placeholder='Title' type="text" {...register('title')} />
            <textarea placeholder='Write your post!' rows="10" cols="100" type="text" {...register('body')} />
            <button type='submit' className='btn-createPost'>Publish</button>
            {children}
        </form>
        
    )
}
