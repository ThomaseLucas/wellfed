
export default function addRecipetoDatabase(username, recipeName, type) {
    fetch('/api/addrecipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, recipeName, type }),
    })
}