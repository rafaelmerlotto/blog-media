import React from 'react'

export default function UserManager({id, user, children}) {
   
    const {email, firstName, surName, birthDate, post, comments } = user
    return (
        <>
           <div key={id}>
            <p>{email}</p>
            <p>{firstName}</p>
            <p>{surName}</p>
            <p>{birthDate}</p>
            <p>{post}</p>
            <p>{comments}</p>
            {children}
        </div>
        -
        </>
     
    )
}
