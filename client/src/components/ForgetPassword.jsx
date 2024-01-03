import React from 'react'
import { useForm } from 'react-hook-form'
import '../assets/css/forgetPassword.css'
import { Link } from 'react-router-dom'

export default function ForgetPassword() {

    const {register, handleSubmit} = useForm()
    const onSubmit = async (data) => {
        console.log(data)
    }

  return (
    <div className='container-forgetPassword'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Please enter the email address you'd like your password reset.</h3>
            <input type="email" className='input-forgetPassword' placeholder='Enter email' {...register('email')} />
            <button className='btn-forgetPassword' type='submit'>Reset password</button>
            <Link className='forget-password' to={"/login"}>Back to login</Link>
        </form>
        
    </div>
  )
}
