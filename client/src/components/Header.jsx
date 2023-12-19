import React from 'react'
import '../assets/css/header.css'
import Logout from './Logout'
import { Link } from 'react-router-dom'


export default function Header({ firstName, children }) {

  return (
    <div className='header'>
      <div className='welcome-user'>
        <p>Welcome back <span>{firstName}</span></p>
      </div>
      <div className='nav'>
        <Link className='link' to={"/blog"}>Home</Link>
        <Link className='link'>About the blog</Link>
        <Logout />
      </div>
      {children}
    </div>
  )
}
