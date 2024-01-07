import React from 'react'
import { useForm } from 'react-hook-form';
import { authService } from '../services';



export default function ProfileImage({profileImage, children}) {


    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        authService.profileImage(data)
    }

  return (
    <div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <input type="file" name='profileImage' defaultValue={profileImage} 
            accept='image/jpeg;image/jpg;image/png' {...register("profileImage")} />
           
            <button type='submit'>Save</button>
            {children}
        </form>
    </div>
  )
}
