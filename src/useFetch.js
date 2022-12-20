import { useEffect, useState, useCallback } from "react";
import fetchWithInterceptor from "./interceptor"

const useFetch = (url) => {
    const [fetchObj, setFetchObj] = useState({
        data: null,
        error: null,
        isPending: true
    })

    const fetchData = useCallback(async (abortController) => {
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
    }, [url])



    useEffect(() => {
        const abortController = new AbortController();

        fetchData(abortController)

        return () => abortController.abort();

    }, [url, fetchData])

    return [fetchObj, setFetchObj]
}

export default useFetch