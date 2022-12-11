import { useEffect, useState } from "react";
import fetchWithInterceptor from "./interceptor"

const useFetch = (url) => {
    const [fetchObj, setFetchObj] = useState({
        data: null,
        error: null,
        isPending: true
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchWithInterceptor(url, { credentials: 'include' })

                const resData = await res.json()

                if (!res.ok) {
                    throw new Error(`${resData.message}!`)
                }

                if (active) {
                    setFetchObj({
                        data: resData,
                        error: null,
                        isPending: false
                    })
                }

            } catch (error) {
                setFetchObj({
                    data: null,
                    error: error.message,
                    isPending: false
                })
            }

        }

        let active = true

        fetchData()

        return () => active = false

    }, [url])

    return fetchObj
}

export default useFetch