import React, { useEffect, useState } from 'react'
import { authService } from '../services'
import UserManager from '../components/UserManager'
import Header from '../components/Header'

export default function Account() {
    const [getUser, setGetUser] = useState([])
    const [user, setUser] = useState("")


    useEffect(() => {
        async function dataUser() {
            const user = await authService.accountUser()
            setGetUser(user.user)
        }
        dataUser()
    }, [])


    async function dataUser(firstName) {
        const user = await authService.user(firstName)
        setUser(user)
    }
    dataUser()

    console.log(getUser)

    return (
        <div>

            <Header firstName={user} />
            {getUser.map((e) => (
                <UserManager
                    key={e.id}
                    id={e.id}
                    email={e.email}
                    firstName={e.firstName}
                    surName={e.surName}
                    birthDate={e.birthDate}
                    post={e.post.length}
                    comments={e.comments.length}
                />
            ))}

        </div>
    )
}
