

export class AuthService {

    iToken;

    constructor(url) {
        this.url = url
    }

    get token() {
        return this.iToken
    }


    async login(email, password) {
        const res = await fetch(`${this.url}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(email, password)
        })
        if (res.ok) {
            const data = await res.json();
            this.iToken = data.accessToken;
            return true
        }
        return false
    }


    async registerUser(firstName, surName, email, password, birthDate) {
        const res = await fetch(`${this.url}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(firstName, surName, email, password, birthDate)
        })
        if (res.ok) {
            const data = await res.json();
            return data
        }
    }

    async user(firstName) {
        const res = await fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: this.iToken
            },
            body: JSON.stringify(firstName)
        })
        if (res.ok) {
            const data = await res.json();
            return data.name
        }
        return false
    }

    async accountUser( ) {
        const res = await fetch(`${this.url}/manager/user`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: this.iToken
            },
        })
        if (res.ok) {
            return await res.json(); 
        }
        return false
    }

}


