import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, redirect, useNavigate } from 'react-router-dom'
import '../assets/css/register.css'

import { authService } from '../services'

export default function Register() {
 
    const {register, handleSubmit} = useForm();
    let navigate = useNavigate();
    const onSubmit = (firstName, surName, email, password, birthDate) => {
        const fetchRegister = authService.registerUser(firstName, surName, email, password, birthDate);
        if(!fetchRegister){
            return redirect("/register")
          }
          return  navigate('/')
    }
  return (
    <div className='container-register'>
      
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create your Blog account</h2>
            <p>Already have an account? <Link className='link-register' to={"/"}>Log in</Link></p>
            <input placeholder='First name' type="text" {...register('firstName')} />
            <input placeholder='Surname' type="text" {...register('surName')} />
            <input placeholder='Email' type="email" {...register('email')} />
            <input placeholder='Password' type="password" {...register('password')} />
            <input  type='date' {...register('birthDate')} />
            <button className='btn-register' type='submit'>Register</button>
            
    </form>
    </div>
  
  )
}
