import { motion } from "framer-motion"
import { useState, useCallback } from "react";
import Button from "./Button";
import useAuth from "./useAuth";

const Auth = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const baseUrl = "https://bucket-52ae.onrender.com/api/v1/auth"
    const [url, setUrl] = useState(`${baseUrl}/login`)

    const { handleSubmit, error } = useAuth({ username, password }, url)

    const toggleUrl = useCallback(() => {
        if (url === `${baseUrl}/register`) {
            setUrl(`${baseUrl}/login`)
        } else {
            setUrl(`${baseUrl}/register`)
        }
    }, [url, baseUrl])

    return (
        <main className="register">
            <form onSubmit={handleSubmit}>
                <h2 style={{ marginBottom: "15px" }}>{url === `${baseUrl}/register` ? "Register" : "Login"}</h2>
                <label>Username</label>
                <motion.input whileFocus={{ scale: 1.1 }} type="text" placeholder="example:Johnny-Boy" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <motion.input whileFocus={{ scale: 1.1 }} type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <p style={{ color: "red" }}>{error && error}</p>
                <p onClick={toggleUrl} style={{ color: "blue", textDecoration: "underline", fontSize: "1rem", cursor: "pointer" }}>{url === `${baseUrl}/register` ? "Already have an account? Login" : "Don't have an account yet? Register"}</p>
                <Button buttonName={"login"} />
            </form>
        </main>
    );
}

export default Auth