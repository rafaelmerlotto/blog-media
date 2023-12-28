import { appCommentService, authService } from ".";


export class AppPostService {


    constructor(url) {
        this.url = url;
    }


    // GET USER POSTS
    async posts() {
        const res = await fetch(`${this.url}/posts/user`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
        })
        if (res.ok) {
            return await res.json();
        }
        return false
    }

    // GET ALL POSTS ON TIMELINE
    async gatAllPosts() {
        const res = await fetch(`${this.url}/posts`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken,
            },
        })
        if (res.ok) {
            return await res.json()
        }
        return false
    }

    // CREATE POST
    async createPost(title, body) {
        const res = await fetch(`${this.url}/create`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
            body: JSON.stringify(title, body)
        })
        if (res.ok) {
            return await res.json();
        }
        return false
    }

// DELETE POST
async deletePost(postId){
    const res = await fetch(`${this.url}/delete/${postId}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            authorization: authService.iToken
        },
    })
    if (res.ok) {
        const data =await res.json();
        console.log(data)
        return 
    }
    return false
}


}

