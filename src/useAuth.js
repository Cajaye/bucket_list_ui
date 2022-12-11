import { useHistory } from "react-router-dom";

const useAuth = (userDetails, url) => {
    //error
    //pending
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
                body: JSON.stringify(userDetails)
            })

            const { username: user, message } = await res.json()

            if (!res.ok) {
                throw new Error(message)
            }

            localStorage.setItem("token", user)

            history.push("/")

        } catch (error) {
            console.log(error.message);
        }

    }
    return { handleSubmit }
}

export default useAuth