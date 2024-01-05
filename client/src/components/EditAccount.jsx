import React from 'react'
import { useForm } from 'react-hook-form'
import { authService } from '../services';

export default function EditAccount({ firstName, surName, children }) {

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        authService.editAccount(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" defaultValue={firstName} {...register("firstName")} />
            <input type="text" defaultValue={surName} {...register("surName")} />
            <button type='submit'>Save</button>
            {children}
        </form>
    )
}
