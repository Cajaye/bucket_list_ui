//use params
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import useFetch from "./useFetch"
import fetchWithInterceptor from "./interceptor";

//add and delete btns

const BucketDetails = () => {
    const history = useHistory()
    const { id: bucketID } = useParams();
    const { data: lists, error, isPending } = useFetch(`http://localhost:8000/api/v1/user/list?bucketID=${bucketID}`)

    useEffect(() => {
        const login = localStorage.getItem("token")

        if (!login) {
            history.push("/authorize")
        }
    }, [history])

    //when checkbox is checked send a patch method to the server setting status to the state of the checkbox

    const handleCheck = async (event, id) => {
        let checked = event.target.checked;
        try {
            const res = await fetchWithInterceptor(`http://localhost:8000/api/v1/user/list/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ status: checked })
            })

            const { message } = await res.json()

            if (!res.ok) {
                throw new Error(message)
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ margin: "40px" }} className="bucket-details">
            {lists && lists.map((list) => {
                return <label key={list._id} className="checkbox">
                    <input type="checkbox" name="checkbox" defaultChecked={list.status} onChange={e => handleCheck(e, list._id)} />
                    <input style={{ border: "none" }} type="text" defaultValue={list.name} />
                </label>
            })}
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
        </div>
    );
}

export default BucketDetails;