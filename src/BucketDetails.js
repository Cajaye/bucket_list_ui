//use params
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useCallback, useContext } from "react";
import fetchWithInterceptor from "./interceptor";
import Create from "./Create";
//add and delete btns

const BucketDetails = () => {
    const history = useHistory()
    const { id: bucketID } = useParams();
    const [name, setName] = useState("")
    const [fetchObj, setFetchObj] = useState({
        data: null,
        error: null,
        isPending: true
    })

    const handleCheck = useCallback(async (event, id) => {
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
    }, [])

    const createListItem = useCallback(async (e) => {
        e.preventDefault()
        try {
            setFetchObj({
                data: null,
                error: null,
                isPending: true
            })

            const res = await fetchWithInterceptor(`http://localhost:8000/api/v1/user/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ name: name, bucket: bucketID })
            })

            const resData = await res.json()

            if (!res.ok) {
                throw new Error(resData.message)
            }


            setFetchObj({
                data: [resData, ...fetchObj.data],
                error: null,
                isPending: false
            })

            setName("")

        } catch (error) {
            setFetchObj({
                data: null,
                error: error.message,
                isPending: false
            })
        }
    }, [bucketID, fetchObj.data, name])


    useEffect(() => {
        const login = localStorage.getItem("token")

        if (!login) {
            history.push("/authorize")
            return
        }

        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                const res = await fetchWithInterceptor(`http://localhost:8000/api/v1/user/list?bucketID=${bucketID}&sort=-createdAt`, { credentials: 'include', signal: abortController.signal })

                const resData = await res.json()

                if (!res.ok) {
                    throw new Error(`${resData.message}!`)
                }

                setFetchObj({
                    data: resData,
                    error: null,
                    isPending: false
                })

            } catch (error) {
                if (error.name === 'AbortError') {
                    return
                }
                setFetchObj({
                    data: null,
                    error: error.message,
                    isPending: false
                })

            }
        }

        fetchData()

        return () => abortController.abort();

    }, [history, bucketID])

    return (
        <div style={{ margin: "40px" }} className="bucket-details">
            <Create prompt={"Add an item"} handleSubmit={createListItem} value={name} setValue={setName} styles={{ width: "60%" }} />
            {fetchObj.data && fetchObj.data.map((list) => {
                return <label key={list._id} className="checkbox">
                    <input type="checkbox" name="checkbox" defaultChecked={list.status} onChange={e => handleCheck(e, list._id)} />
                    <input style={{ border: "none" }} type="text" defaultValue={list.name} />
                </label>
            })}
            {fetchObj.isPending && <div>Loading...</div>}
            {fetchObj.error && <div>{fetchObj.error}</div>}
        </div>
    );
}

export default BucketDetails;