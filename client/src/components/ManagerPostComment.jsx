import React from 'react'
import { appPostService } from '../services'
import '../assets/css/deletedPost.css'

export default function ManagerPostComment({ postId, children }) {

    async function deletedPost() {
        const res = await appPostService.deletePost(postId);
        console.log(res)
        return res
    }

    const handleDelete = (e) => {
        e.preventDefault()
        deletedPost()
    }

    return (
        <div className='manager-post'>
            <details class="dropdown">
                <summary role="button">
                    <a class="button">...</a>
                </summary>
                <ul>
                    <li> <button onClick={handleDelete} type='submit' className='btn-managerPost'>Delete post</button></li>
                    <li> <button >Edit post</button></li>
                </ul>
            </details>
            {children}
        </div>
    )
}
