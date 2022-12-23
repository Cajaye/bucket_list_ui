import { useEffect, useCallback } from "react";
import fetchWithInterceptor from "./interceptor";
import Bucket from "./Bucket";
import { useHistory } from "react-router-dom";
import Button from "./Button";
import useFetch from "./useFetch";


//popup to comfirm delete and logout,login


const Home = () => {
    const history = useHistory()
    const [fetchObj, setFetchObj] = useFetch(`http://localhost:8000/api/v1/user/bucket?sort=-createdAt`)


    const deleteBucket = useCallback(async (id) => {
        try {
            const res = await fetchWithInterceptor(`http://localhost:8000/api/v1/user/bucket/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })

            const { message } = await res.json()

            if (!res.ok) {
                throw new Error(message)
            }

            setFetchObj({
                data: fetchObj.data.filter((bucket) => bucket._id !== id),
                error: null,
                isPending: false
            })

        } catch (error) {
            console.log(error);
        }
    }, [setFetchObj, fetchObj])

    useEffect(() => {
        const login = localStorage.getItem("token")

        if (!login) {
            history.push("/authorize")
        }
    }, [history])

    return (
        <div className="home">
            <div style={{ marginBottom: "25px" }}>
                <h2>Buckets!</h2>

                <Button onClick={() => history.push('/create')} buttonName={"Add bucket +"} />

                <p>Curated list of things we want to do:</p>
            </div>
            <div className="buckets">
                {fetchObj.isPending && <div>Loading...</div>}
                {fetchObj.error && <div style={{ color: "red" }}>{fetchObj.error}</div>}
                {fetchObj.data && fetchObj.data.map((bucket) =>
                    <Bucket onClick={() => deleteBucket(bucket._id)} id={bucket._id} key={bucket._id} title={bucket.title} createdAt={bucket.createdAt} />)
                }
            </div>
        </div>
    );
}

export default Home;