

export class AuthService  {

    iToken;
   

    constructor(url, message, authorId) {
        this.url = url
        this.message = message
        this.authorId = authorId
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
        if (!res) {
            return false
        }
        const data = await res.json();
        this.iToken = data.accessToken;
        this.message = data.msg
        return true

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
            return await res.json();
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
            this.authorId = data.id
            return data.name
        }
        return false
    }

    async getUserId( authorId) {
        const res = await fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: this.iToken
            },
            body: JSON.stringify( authorId)
        })
        if (res.ok) {
            const data = await res.json();
            this.authorId = data.id
            return data.id
        }
        return false
    }

    async accountUser() {
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

    async editAccount(firstName, surName) {
        const res = await fetch(`${this.url}/editAccount`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: this.iToken
            },
            body: JSON.stringify(firstName, surName)

        })
        if (res.ok) {
            return await res.json();
        }
        return false
    }

    async deleteAccountUser() {
        const res = await fetch(`${this.url}/deleteAccount`, {
            method: 'DELETE',
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

    async changePassword(newPassword, repeatNewPassword) {
        const res = await fetch(`${this.url}/changepassword`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: this.iToken
            },
            body: JSON.stringify(newPassword, repeatNewPassword)
        })
        console.log(res)
        if (res.ok) {

            const data = await res.json();
            this.message = data.msg
            return true
        }
        return false
    }

}


