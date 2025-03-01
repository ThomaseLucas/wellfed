import login from './login.js'

export default async function signUp(username, password) {
    //send a post request to /api/signup
    try {
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        let resJson = await res.json()

        if (res.status === 200) {
            console.log("Success");
            login(username, password);
            return resJson
        } 
       
        
        return resJson

    } catch (error) {
        console.error('Error:', error);
        return resJson // Handle network errors
    }
}
