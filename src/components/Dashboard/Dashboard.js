import useApi from '../../hooks/useApi';
import ErrorScreen from '../ErrorScreen';
import { Skeleton, Typography } from 'antd';
import UserList from '../UserList';

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
            <UserList users={users}/>
        </>
    );
};

export default Dashboard;