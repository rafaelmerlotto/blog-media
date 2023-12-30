import React from 'react'
import '../assets/css/header.css'
import Logout from './Logout'
import { Link, useNavigate } from 'react-router-dom'
import profilePic from '../assets/images/profile-pic.png'
import logo from '../assets/images/logo-post-blog.png'

export default function Header({ firstName, children }) {

  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    return navigate("/account")
  }

  return (
    <div className='header'>
      <div className='welcome-user'>
        <img src={logo} alt="logo" height={70} />
        <p>Welcome back {firstName}&nbsp;
        <img 
        onClick={handleClick} 
        src={profilePic} 
        style={{ borderRadius: 100, cursor:"pointer" }} 
        height={30} /></p>
      </div>
      <div className='nav'>
        <Link className='link' to={"/blog"}>Home</Link>
        <Link className='link' to={"/timeline"}>Timeline</Link>
        <Link className='link' to={"/account"}>My Account</Link>
        <Link className='link'>About the blog</Link>
        <Logout />
      </div>
      {children}
    </div>
  )
}
