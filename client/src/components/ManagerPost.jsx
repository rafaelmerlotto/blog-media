import React, { useState } from 'react'
import { appCommentService, appPostService, authService } from '../services'
import '../assets/css/deletedPost.css'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/css/contents.css'
import '../assets/css/modal.css'
import UpdatePost from './UpdatePost'


export default function ManagerPost({ postId, authorId, title, body, children }) {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal);
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    }
  

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
            <>
                <div className='manager-post'>
                    <details class="dropdown">
                        <summary role="button">
                            <a class="button">...</a>
                        </summary>
                        <ul>
                            <li> <button onClick={handleDelete} type='submit' className='btn-managerPost'>Delete post</button></li>
                            <li> <button type='submit' onClick={toggleModal} className='btn-edit' >Edit post</button></li>
                        </ul>
                    </details>
                    {children}
                </div>
                {modal && (
                    <div className="modal">
                        <div onClick={toggleModal} className="overlay"></div>
                        <div className="modal-content">
                            <h2>Edit your post</h2>
                            <UpdatePost postId={postId} title={title} body={body} />
                            <button className="close-modal" onClick={toggleModal}>X</button>
                        </div>
                    </div>
                )}
            </>


        )
    }

}
