import { useEffect, useCallback } from "react";
import fetchWithInterceptor from "./interceptor";
import useFetch from "./useFetch"
import Bucket from "./Bucket";
import { useHistory } from "react-router-dom";
import Button from "./Button";

const Home = () => {
    const history = useHistory()
    const { data: buckets, error, isPending } = useFetch("http://localhost:8000/api/v1/user/bucket")

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


        } catch (error) {
            console.log(error);
        }
    }, [])

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
                {isPending && <div>Loading...</div>}
                {error && <div style={{ color: "red" }}>{error}</div>}
                {buckets && buckets.map((bucket) =>
                    <Bucket onClick={() => deleteBucket(bucket._id)} id={bucket._id} key={bucket._id} title={bucket.title} createdAt={bucket.createdAt} />)
                }
            </div>
        </div>
    );
}

export default Home;