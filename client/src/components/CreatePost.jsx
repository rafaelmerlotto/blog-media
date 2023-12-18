import React from 'react'
import { useForm } from 'react-hook-form';
import { appService } from '../services';

export default function CreatePost({onCreate}) {

   
  
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        appService.createPost(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('title')} />
            <input type="text" {...register('body')} />
            <button type='submit'>Create</button>
            
        </form>
        
    )
}
