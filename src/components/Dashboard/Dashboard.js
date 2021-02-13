import useApi from '../../hooks/useApi';
import ErrorScreen from '../ErrorScreen';
import { Skeleton, Typography } from 'antd';

const Dashboard = () => {
    const { Title } = Typography;
    const { data: users, loading, error } = useApi();

    if ( loading ) {
        return <Skeleton active/>;
    }

    if ( error ) {
        return <ErrorScreen error={error}/>;
    }

    return (
        <>
            <Title>Users:</Title>
            <ul>
                {
                    users.map(user => <li key={user.id}>{user.name} - {user.email}</li>)
                }
            </ul>
        </>
    );
};

export default Dashboard;