import { authService } from ".";


export class AppCommentService {

    iPostId;
    iCommentId;

    constructor(url) {
        this.url = url
        
    }

    get postId() {
        return this.iPostId
    }

    get commentId() {
        return this.commentId
    }

    async createComment(comment) {
        const res = await fetch(`${this.url}/create/${this.iPostId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken,
            },
            body: JSON.stringify(comment)
        })
        if (res.ok) {
            return await res.json();
        }
        return false
    }


    async comments() {
        const res = await fetch(`${this.url}/comments`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            }
        })
        if (res.ok) {
            return await res.json();
        }
        return false
    }

    async updateComment(commentId, comment) {
        const res = await fetch(`${this.url}/update/${commentId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
            body: JSON.stringify(comment)
        })
        if (res.ok) {
            return await res.json();
        }
        return false
    }

    async deleteComment(commentId, authorId) {
        const res = await fetch(`${this.url}/delete/${commentId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },

        })
        if (res.ok) {
            authService.authorId = authorId
            return await res.json();
        }
        return false
    }
}