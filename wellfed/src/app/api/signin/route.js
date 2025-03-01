import clientPromise from ".../lib/mongodb.js";

export default async function POST(req){
    try{
        const client = await clientPromise;
        const db = client.db();
        const users = db.collection("users");

        const {username, password } = req.json();
        if (!username || !password){
            return NextResponse.json({status: 400, body: "Username and password are required"});
        }

        const user = await db.collection("users").findOne({username});
        if (!user){
            return NextResponse({status: 403, body: "User not found"});
        }
        
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid){
            return NextResponse({status: 403, body: "Invalid password"});
        }

        return NextResponse.json({ username });
        
    } catch (error){
        console.error(error);
        return {status: 500, body: "Internal server error"};
    }
}