import React, { useEffect, useState } from 'react'
import { appPostService, authService } from '../services'
import Header from '../components/Header'
import AllContents from '../components/AllContents';


export default function Timeline() {

    const [allContents, setAllContents] = useState([]);
    const [user, setUser] = useState("")

    useEffect(() => {
        async function allPosts() {
            const posts = await appPostService.gatAllPosts();
            setAllContents(posts.post)
            return
        }
        allPosts()
    }, [])



    async function dataUser(firstName) {
        const user = await authService.user(firstName)
        setUser(user)
    }
    dataUser()



    return (
        <div>
            <Header firstName={user} />
            <h2 className='timeline-title' style={{ textAlign: "center", color: "#757f9a" }}>Timeline</h2>
            {allContents.map((e) => (
                <>
                    <AllContents key={e.id} post={e} comments={e.comments} />
                </>
            ))}

        </div>
    )
}
