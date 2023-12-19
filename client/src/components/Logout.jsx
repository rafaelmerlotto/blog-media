import React from 'react'
import { useAuth } from '../auth/auth'
import { Link } from 'react-router-dom'
import '../assets/css/logout.css'


export default function Logout() {
    const {logout} = useAuth()
  return (
    <div>
        <Link className='btn-logout' type='logout' to={'/'} onClick={logout}>Logout</Link>
    </div>
  )
}
