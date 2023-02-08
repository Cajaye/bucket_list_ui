import { useHistory } from "react-router-dom";
import { useState } from "react";

const useAuth = (userDetails, url) => {
    const [error, setError] = useState(null)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ ...userDetails })
            })

            const { username: user, message } = await res.json()


            if (!res.ok) {
                throw new Error(message)
            } else {
                localStorage.setItem("token", user)
                history.push("/")
            }

        } catch (error) {
            setError(error.message)
        }

    }
    return { handleSubmit, error }
}

export default useAuth