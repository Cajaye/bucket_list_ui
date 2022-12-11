import { motion } from "framer-motion"
import { useState } from "react";
import Button from "./Button";
import useAuth from "./useAuth";

const Auth = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const baseUrl = "http://localhost:8000/api/v1/auth"
    const [url, setUrl] = useState(`${baseUrl}/login`)

    const { handleSubmit } = useAuth({ username, password }, url)

    return (
        <main className="register">
            <form onSubmit={handleSubmit}>
                <h2 style={{ marginBottom: "15px" }}>{"Login"}</h2>
                <label>Username</label>
                <motion.input whileFocus={{ scale: 1.1 }} type="text" placeholder="example:Johnny-Boy" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <motion.input whileFocus={{ scale: 1.1 }} type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button buttonName={"login"} />
            </form>
        </main>
    );
}

export default Auth