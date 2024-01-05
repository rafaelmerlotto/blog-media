import React, { useState } from 'react'
import { appCommentService, authService } from '../services';
import UpdateComment from './UpdateComment';

export default function ManagerComment({ commentId, comment, authorId, children }) {


    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

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
            <>
                <div className='manager-post'>
                    <details class="dropdown">
                        <summary role="button" >
                            <a class="btn">...</a>
                        </summary>
                        <ul>
                            <li> <button onClick={handleDelete} type='submit' className='btn-managerPost'>Delete comment</button></li>
                            <li> <button className='btn-edit' onClick={toggleModal} >Edit comment</button></li>
                        </ul>
                    </details>
                    {children}
                </div>
                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <h2>Edit your comment</h2>
                            <UpdateComment commentId={commentId} comment={comment} />
                            <button className="close-modal" onClick={toggleModal}>X</button>
                        </div>
                    </div>
                )}
            </>

        )
    }

}
