import React from 'react'
import '../assets/css/account.css'
import profilePic from '../assets/images/Rafael_Merlotto.jpg'

export default function UserManager({ id, email, firstName, surName, birthDate, post, comments }) {

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
                    <button className='btn-account'>Delete account</button>
                </div>


            </div>


        </div>
    )
}
