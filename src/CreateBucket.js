import { useState } from "react";
import { useHistory } from "react-router-dom";
import Create from "./Create";

const CreateBucket = () => {
    const baseUrl = "http://localhost:8000/api/v1/user/bucket"
    const [title, setTitle] = useState("")
    const history = useHistory()

    //error
    //pending

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ title })
            })

            const { message } = await res.json()
            //err success message

            if (!res.ok) {
                throw new Error(message)
            }

            history.push("/")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Create placeholder={"example: Places to eat"} prompt={"Enter the title of your bucket"} handleSubmit={handleSubmit} value={title} setValue={setTitle} cssStyles={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%"
        }} />
    );
}

export default CreateBucket;