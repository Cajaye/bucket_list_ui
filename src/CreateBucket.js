import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "./Button";

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
        <main className="create">
            <form onSubmit={handleSubmit}>
                <label>Enter the title of your bucket</label>
                <input type="text" placeholder="example: Places to eat" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Button buttonName={"Enter"} />
            </form>
        </main>
    );
}

export default CreateBucket;