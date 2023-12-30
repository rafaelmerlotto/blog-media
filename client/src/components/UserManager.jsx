import React, { useEffect, useState } from 'react'
import '../assets/css/account.css'
import profilePic from '../assets/images/profile-pic.png'
import { authService } from '../services'
import { useNavigate } from 'react-router-dom'


export default function UserManager({ id, email, firstName, surName, birthDate, post, comments }) {

    const navigate = useNavigate()

    async function deleteAccount() {
        const user = await authService.deleteAccountUser()
        return user
    }

    const handleDelete = async (event) => {
        event.preventDefault()
        deleteAccount();
        return navigate("/deletedAccount")
    }

    const handleChangePassword = async (event) => {
        event.preventDefault()
        return navigate('/changePassword')
    }


    return (
        <div className='container-account' key={id}>
            <div className='content-account'>
                <div className='container-account-info'>
                    <img src={profilePic} height={150} />
                    <p>Email: {email}</p>
                    <p>Full name: {firstName} {surName}</p>
                    <p>Birth of date: {birthDate}</p>
                    <p>Post published: {post}</p>
                    <p>Comments published: {comments}</p>
                </div>
                <div className='container-account-manager'>
                    <button className='btn-account'>Profile image</button>
                    <button className='btn-account' onClick={handleChangePassword}>Change password</button>
                    <button className='btn-account' style={{ background: "rgb(169, 48, 48)" }} onClick={handleDelete}>Delete account</button>
                </div>
            </div>
        </div>
    )
}
