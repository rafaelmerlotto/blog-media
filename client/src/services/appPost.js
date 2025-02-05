import { authService } from ".";



export class AppPostService{
   

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


    // UPDATE POST
    async updatePost(postId, title, body) {
        const res = await fetch(`${this.url}/update/${postId}`, {
            method: 'PUT',
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
    async deletePost(postId, authorId) {
        const res = await fetch(`${this.url}/delete/${postId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            }
        })
        if (res.ok) {
            authService.authorId = authorId
            return await res.json();
        }
        return false
    }


}

