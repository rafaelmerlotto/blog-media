import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, redirect, useNavigate } from 'react-router-dom'
import '../assets/css/register.css'
import { authService } from '../services'
import logo from '../assets/images/logo-post-blog.png'

export default function Register() {

  const { register, handleSubmit } = useForm();

  let navigate = useNavigate();

  const onSubmit = async (firstName, surName, email, password, birthDate) => {
    const fetchRegister = await authService.registerUser(firstName, surName, email, password, birthDate);
    if (!fetchRegister) {
      return redirect("/register")
    }
    return navigate('/login')
  }

  return (
    <div className='container-register'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src={logo} alt="logo" height={100} />
        <h2>Create your Blog account</h2>
        <p>Already have an account? <Link className='link-register' to={"/login"}>Log in</Link></p>
        <input placeholder='First name' type="text" {...register('firstName', { required: true })} />
        <input placeholder='Surname' type="text" {...register('surName')} />
        <input type='date' {...register('birthDate')} />
        <input placeholder='Email' type="email" {...register('email', { required: true })} />
        <input placeholder='Password' type="password" {...register('password', { required: true, minLength: 5 })} />
        <p className='info-password'>* Your password must contain at least 5 characters.</p>
        <button className='btn-register' type='submit'>Register</button>
      </form>
    </div>

  )
}
