import { useEffect, useState } from "react";
import fetchWithInterceptor from "./interceptor"

const useFetch = (url) => {
    const [fetchObj, setFetchObj] = useState({
        data: null,
        error: null,
        isPending: true
    })


    useEffect(() => {
        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                const res = await fetchWithInterceptor(url, { credentials: 'include', signal: abortController.signal })

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

    }, [url])

    return fetchObj
}

export default useFetch