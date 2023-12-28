import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, redirect, useNavigate } from 'react-router-dom'
import '../assets/css/login.css'
import { useAuth } from '../auth/auth';
import { authService } from '../services';

export default function Login() {
    const [alert , setAlert] = useState("")
    const { token, login } = useAuth()

    const { register, handleSubmit } = useForm();
    let navigate = useNavigate();
    const onSubmit = async (data) => {
        const res = await login(data);
        setAlert(authService.message)
       return res
    };
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
            return navigate("/blog")
        }
    }, [token])


    return (
        <div className='container-login'>
            <form onSubmit={handleSubmit(onSubmit)}>                                                                                                                                                                                 
                <h2>Welcome back.</h2>
                <p>New to Blog? <Link className='link-login' to={"/register"}>Sign up</Link></p>
                <input placeholder='Email' type="email" {...register('email')} />
                <input placeholder='Password' type="password" {...register('password')} />
                <p className='alert'>{alert}</p>
                <button className='btn-login' type='submit'>Log in</button>
                <Link className='forget-password' to={"/register"}>Forget password?</Link>
            </form>

        </div>
    )
}
