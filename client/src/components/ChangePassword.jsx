import React, { useState } from 'react'
import { authService } from '../services';
import { useForm } from 'react-hook-form';
import { redirect, useNavigate } from 'react-router-dom';
import '../assets/css/changePassword.css'
import Header from './Header';


export default function ChangePassword() {

    const [user, setUser] = useState("")
    const [message, setMessage] = useState("");
    const { register, handleSubmit } = useForm();
    let navigate = useNavigate();

    const onSubmit = async (data) => {
        const changedPassword = await authService.changePassword(data);
        console.log(changedPassword)
        console.log(data)
        if (changedPassword !== true) {
            return redirect('/deletePassword')
        }
        setMessage(authService.message)
        setTimeout(() => {
            return navigate("/account")
        }, 2500);
    }

    async function dataUser(firstName) {
        const user = await authService.user(firstName)
        setUser(user)
      }
      dataUser()

    return (
        <>
        <Header firstName={user}/>
            <form className='change-password' onSubmit={handleSubmit(onSubmit)}>

                <input type="password" placeholder='New password' className='new-password' {...register("newPassword", {required:true, minLength:5})} />
                <input type="password" placeholder='Repeat new password' className='new-password' {...register("repeatNewPassword", {required:true, minLength:5})} />
                <p className='info-change-password'>* Your new password must contain at least 5 characters.</p>
                <button className='btn-change-password' type='submit'>Change password</button>
                <p className='message'>{message}</p>
            </form>
        </>

    )
}