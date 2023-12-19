import { authService } from ".";


export class AppService {

    constructor(url) {
        this.url = url;

    }

    async posts() {
        const res = await fetch(`${this.url}/posts`, {
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
            const data = await res.json();
            return true
        }
        return false
    }


}

