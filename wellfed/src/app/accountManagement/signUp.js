export default function signUp(username, password) {
    //send a post request to /api/signup
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
        .then(async (res) => {
            let a = await res.json()
            if(res.status === 200) {
                console.log("sucess")
                window.location.href = '/dashboard';
            } else {
                console.log("failed")
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
