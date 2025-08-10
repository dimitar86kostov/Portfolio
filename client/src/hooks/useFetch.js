import { useEffect, useState } from "react";

export default function useFetch(url, initData) {
    const [data, setData] = useState(initData);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {

        const abortController = new AbortController();
        (
            async () => {
                const response = await fetch(url, { signal: abortController.signal });
                const result = await response.json();

                setData(result);
                setIsFetching(false);
            }
        )();
        return () => abortController.abort();
    }, [url]);

    return {
        data,
        isFetching
    }
}
