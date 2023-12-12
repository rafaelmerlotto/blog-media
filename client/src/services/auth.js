

export async function login(email, password) {
    const res = await fetch(`http://localhost:4000/auth/login/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(email, password)  
    })
    if(res.ok){
        const data  = await res.json();
        console.log(data)
        return data
        
    }
}


