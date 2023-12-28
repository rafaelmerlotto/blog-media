import { appPostService, authService } from ".";


export class AppCommentService {
    iPostId;

    constructor(url) {
        this.url = url
    }

    get postId() {
        return this.iPostId
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
            const data = await res.json();
            console.log(data)
            return data
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
            const data = await res.json();
            return data
        }
        return false
    }



}