import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { appPostService } from '../services';
import '../assets/css/createPost.css'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

export default function CreatePost({onCreate, firstName, children}) {

    const navigate= useNavigate()
    const [isLoading, setIsLoading] = useState(false)


    const { register, handleSubmit } = useForm();


    
    const onSubmit = (data) => {
        setIsLoading(true)
        appPostService.createPost(data)
           setTimeout(() => {
      setIsLoading(false)
    }, 3000);
    }
    
    
    

    return (
        <form className='createPost' onSubmit={handleSubmit(onSubmit)}>
            <h3>Would you like to publish a post, {firstName}?</h3>
            <input placeholder='Title' type="text" {...register('title')} />
            <textarea placeholder='Write your post!' rows="10" cols="100" type="text" {...register('body')} />
              <p>{isLoading ? <Loading/> : ""} </p> 
           < button type='submit'  className='btn-createPost'>Publish</button>
        
            {children}
        </form>
        
    )
}
