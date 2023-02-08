import { motion } from "framer-motion"
import { useState, useCallback } from "react";
import Button from "./Button";
import useAuth from "./useAuth";
import { baseUrl } from "./baseurl";

const Auth = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const initialUrl = `${baseUrl}/auth`
    const [url, setUrl] = useState(`${initialUrl}/login/`)

    const { handleSubmit, error } = useAuth({ username, password }, url)

    const toggleUrl = useCallback(() => {
        if (url === `${initialUrl}/register/`) {
            setUrl(`${initialUrl}/login/`)
        } else {
            setUrl(`${initialUrl}/register/`)
        }
    }, [url, initialUrl])

    return (
        <main className="register">
            <form onSubmit={handleSubmit}>
                <h2 style={{ marginBottom: "15px" }}>{url === `${baseUrl}/register` ? "Register" : "Login"}</h2>
                <label>Username</label>
                <motion.input whileFocus={{ scale: 1.1 }} type="text" placeholder="example:Johnny-Boy" required value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <motion.input whileFocus={{ scale: 1.1 }} type="password" placeholder="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <p style={{ color: "red" }}>{error && error}</p>
                <p onClick={toggleUrl} style={{ color: "blue", textDecoration: "underline", fontSize: "1rem", cursor: "pointer" }}>{url === `${initialUrl}/register` ? "Already have an account? Login" : "Don't have an account yet? Register"}</p>
                <Button buttonName={"login"} />
            </form>
        </main>
    );
}

export default Auth