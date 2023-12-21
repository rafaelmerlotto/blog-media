import React, { useEffect, useState } from 'react'
import { appService, authService } from '../services'
import Header from '../components/Header'
import AllContents from '../components/AllContents';


export default function Timeline() {
    const [allContents, setAllContents] = useState([]);
    const [user, setUser] = useState("")

    useEffect(() => {
        async function allPosts() {
            const posts = await appService.gatAllPosts();
            return setAllContents(posts.post)
        }
        allPosts()
    }, [])


    async function dataUser(firstName) {
        const user = await authService.user(firstName)
        setUser(user)
    }
    dataUser()

    console.log(allContents.sort((a, b) => { return (a - b) }).reverse())

    return (
        <div>
            <Header firstName={user} />
            <h2 className='timeline-title' style={{ textAlign: "center", color: "#757f9a" }}>Timeline</h2>
            {allContents.sort().reverse().map((e) => (
                <AllContents post={e} />
            ))}
        </div>
    )
}
