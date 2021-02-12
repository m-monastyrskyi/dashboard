import useApi from './hooks/useApi';

const App = () => {
    const { data: users, loading, error } = useApi();

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
