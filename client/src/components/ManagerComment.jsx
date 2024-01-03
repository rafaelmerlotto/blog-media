import React from 'react'
import { appCommentService, authService } from '../services';

export default function ManagerComment({ commentId, authorId, children }) {


    async function deletedComment() {
        const res = await appCommentService.deleteComment(commentId, authorId);
        return res
    }


    const handleDelete = (e) => {
        e.preventDefault()
        deletedComment()
    }


    if (authorId === authService.authorId) {
        return (
            <div className='manager-post'>
                <details class="dropdown">
                    <summary role="button" >
                        <a class="btn">...</a>
                    </summary>
                    <ul>
                        <li> <button onClick={handleDelete} type='submit' className='btn-managerPost'>Delete comment</button></li>
                        <li> <button className='btn-edit' >Edit comment</button></li>
                    </ul>
                </details>
                {children}
            </div>
        )
    }

}
