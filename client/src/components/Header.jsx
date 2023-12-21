import React from 'react'
import '../assets/css/header.css'
import Logout from './Logout'
import { Link } from 'react-router-dom'
import profilePic from '../assets/images/Rafael_Merlotto.jpg'


export default function Header({ firstName, children }) {

  return (
    <div className='header'>
      <div className='welcome-user'>
        <p>Welcome back {firstName}&nbsp;<img src={profilePic} style={{borderRadius:100}} height={30}/></p>
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
