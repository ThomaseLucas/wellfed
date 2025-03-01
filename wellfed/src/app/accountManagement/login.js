export default async function login(username, password) {
    //send a post request to /api/signup
    try {
        const res = await fetch('/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.status === 200) {
            console.log("Success");
            window.location.replace('/dashboard');
            return res.json() // Explicit return
        } 

        return res.json() // Return failure status

    } catch (error) {
        console.error('Error:', error);
        return res.json() // Handle network errors
    }
}
