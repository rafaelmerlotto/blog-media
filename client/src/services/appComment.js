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
        console.log(res)
        if (res.ok) {
            return await res.json();
        }
        return false
    }

    async deleteComment(commentId) {
        const res = await fetch(`${this.url}/comments/${commentId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            }
        })
        console.log(res)
        if (res.ok) {
            return await res.json();
        }
        return false
    }
}