import React, { useEffect, useState } from 'react'
import '../assets/css/account.css'
import profilePic from '../assets/images/Rafael_Merlotto.jpg'
import { authService } from '../services'
import { useNavigate } from 'react-router-dom'

export default function UserManager({ id, email, firstName, surName, birthDate, post, comments }) {

    const [user, setUser] = useState(false)
    const navigate = useNavigate()


    async function deleteAccount() {
        const user = await authService.deleteAccountUser()
        console.log(user)
        return user
    }
    
    const handleDelete = async (event) => {
        event.preventDefault()
        deleteAccount();
     return navigate("/deletedAccount")
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
                    <button className='btn-account'>Change password</button>
                    <button className='btn-account' onClick={handleDelete}>Delete account</button>
                </div>


            </div>


        </div>
    )
}
