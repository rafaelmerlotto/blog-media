import React from 'react'
import { useForm } from 'react-hook-form'
import { login } from '../services/auth';

export default function Login() {
    const { register, handleSubmit } = useForm();
    
    const onSubmit = (email, password) => {
       login(email, password)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" {...register('email')} />
            <input type="password" {...register('password')} />
            <button type='submit'>Log in</button>
        </form>
    )
}
