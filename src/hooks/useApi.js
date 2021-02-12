import { useState, useEffect } from 'react';
import axios from 'axios';

const useApi = () => {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const url = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';
        const source = axios.CancelToken.source();
        setLoading(true);

        axios.get(url)
            .then(res => {
                console.log(res);
                setLoading(false);
                res.status === 200 && setData(res.data);
            })
            .catch(error => {
                if ( !axios.isCancel(error) ) {
                    setLoading(false);
                    setError(error);
                }
            });

        return () => source.cancel();

    }, []);

    return { data, loading, error };
};

export default useApi;