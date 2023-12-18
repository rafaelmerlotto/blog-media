import React from 'react'
import { useAuth } from '../auth/auth'
import { Link } from 'react-router-dom'

export default function Logout() {
    const {logout} = useAuth()
  return (
    <div>
        <Link type='logout' to={'/'} onClick={logout}>Logout</Link>
    </div>
  )
}
