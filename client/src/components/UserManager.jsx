import React, { useEffect, useState } from 'react'
import '../assets/css/account.css'
import profilePic from '../assets/images/profile-pic.png'
import { authService } from '../services'
import { useNavigate } from 'react-router-dom'
import EditAccount from './EditAccount'


export default function UserManager({ id, email, firstName, surName, birthDate, post, comments }) {

    const navigate = useNavigate()

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

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
        <>
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
                    <button className='btn-account' onClick={toggleModal}>Edit account</button>
                    <button className='btn-account'>Profile image</button>
                    <button className='btn-account' onClick={handleChangePassword}>Change password</button>
                    <button className='btn-account' style={{ background: "rgb(169, 48, 48)" }} onClick={handleDelete}>Delete account</button>
                </div>
            </div>
        </div>
        {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <h2>Edit your comment</h2>
                            <EditAccount firstName={firstName} surName={surName} />
                            <button className="close-modal" onClick={toggleModal}>X</button>
                        </div>
                    </div>
                )}
        </>
       
    )
}
