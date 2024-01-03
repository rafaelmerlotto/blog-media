import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/home.css'
import logo from '../assets/images/logo-post-blog-2.png'

export default function Home() {

  return (
    <div className='container-home'>
      <div className='box-logo'>
        <img src={logo} alt="logo" height={200} />
      </div>
      <div className='box-links'>
        <h1>Sign up now</h1>
        <Link className='home-link-register' to={"/register"}>Create account</Link>
        <h3>Already have an account?</h3>
        <Link className='home-link-login' to={"/login"}>Sign in</Link>
      </div>
    </div>
  )
}
