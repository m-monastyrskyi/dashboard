import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const url = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';
        setLoading(true);
        axios.get(url)
            .then(res => {
                console.log(res);
                setLoading(false);
                res.status === 200 && setUsers(res.data);
            })
            .catch(error => {
                console.log(error);
                setError(error);
                setLoading(false);
            });

    }, []);

    if ( loading ) {
        return <h1>Loading...</h1>;
    }

    if ( error ) {
        return <>
            <h1>Ups... Something went wrong...</h1>
            <pre>{error.message}</pre>
        </>;
    }

    return (<>
            <h1>Users:</h1>
            <ul>
                {
                    users.map(user => <li key={user.id}>{user.name} - {user.email}</li>)
                }
            </ul>

        </>
    );
};

export default App;
