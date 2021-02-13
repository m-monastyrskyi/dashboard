import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Typography } from 'antd';
import ErrorScreen from '../ErrorScreen';
import UserList from '../UserList';
import { fetchUsers, usersSelector } from '../../slices/users';

const Dashboard = () => {
    const { Title } = Typography;
    const dispatch = useDispatch();
    const { users, isFetching, error } = useSelector(usersSelector);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if ( isFetching ) {
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