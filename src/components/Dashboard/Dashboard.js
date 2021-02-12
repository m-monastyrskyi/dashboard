import useApi from '../../hooks/useApi';
import ErrorScreen from '../ErrorScreen';

const Dashboard = () => {
    const { data: users, loading, error } = useApi();

    if ( loading ) {
        return <h1>Loading...</h1>;
    }

    if ( error ) {
        return <ErrorScreen error={error}/>;
    }

    return (
        <>
            <h1>Users:</h1>
            <ul>
                {
                    users.map(user => <li key={user.id}>{user.name} - {user.email}</li>)
                }
            </ul>
        </>
    );
};

export default Dashboard;