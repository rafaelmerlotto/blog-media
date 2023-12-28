import React from 'react'
import { appPostService } from '../services'

export default function DeletedPost({postId, children}) {


    async function deletedPost(){
        const res = await appPostService.deletePost(postId);
        console.log(res)
        return res
    }

    const handleDelete =() => {
        deletedPost()
    }

    return (
        <div className='manager-post'>
            <button onClick={handleDelete} type='submit' className='btn-managerPost'>Delete post</button>
            <button >Edit post</button>
          {children}  
        </div>  
    )
}
