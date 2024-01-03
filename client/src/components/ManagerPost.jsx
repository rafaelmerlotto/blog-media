import React from 'react'
import { appPostService, authService } from '../services'
import '../assets/css/deletedPost.css'

export default function ManagerPost({ postId, authorId, children }) {

    async function deletedPost() {
        const res = await appPostService.deletePost(postId, authorId);
        console.log(res)
        return res
    }

    const handleDelete = (e) => {
        e.preventDefault()
        deletedPost()
    }


    if (authorId === authService.authorId) {
        return (
            <div className='manager-post'>
                <details class="dropdown">
                    <summary role="button">
                        <a class="button">...</a>
                    </summary>
                    <ul>
                        <li> <button onClick={handleDelete} type='submit' className='btn-managerPost'>Delete post</button></li>
                        <li> <button className='btn-edit' >Edit post</button></li>
                    </ul>
                </details>
                {children}
            </div>
        )
    }

}
