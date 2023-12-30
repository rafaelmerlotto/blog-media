import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';
import '../assets/css/deletedAccount.css'


export default function DeletedAccount() {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleClick = (event) => {
        event.preventDefault();
        logout();
        return navigate("/");
    }

    return (
        <div className='container-deletedAccount'>
            <div className="content">
                <h2>Your account has been successfully deleted</h2>
                <button className='btn-deletedAccount' onClick={handleClick}>Return to the Log in</button>
            </div>

        </div>
    )
}
