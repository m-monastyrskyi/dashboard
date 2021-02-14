import { useState } from 'react';
import { Button, Row, Table, Typography } from 'antd';
import CustomButton from '../CustomButton';
import { useDispatch } from 'react-redux';
import { deleteUserFromApi, showModal } from '../../slices/users';
import AddOrUpdateUserModal from '../AddOrUpdateUserModal';

const { Title } = Typography;

const UserList = ({ users }) => {
    const [entity, setEntity] = useState(null);
    const dispatch = useDispatch();
    const data = users.map(user => ({ key: user.id, ...user }));
    const columns = [
        {
            title: 'ID', dataIndex: 'id', width: 50,
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Name', dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email', dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Username', dataIndex: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            render: (_, record) => record.username || ''
        },
        {
            title: 'City', key: 'city',
            sorter: (a, b) => a.address.city.localeCompare(b.address.city),
            render: (_, record) => record.address ? record.address.city : ''
        },
        {
            title: 'Edit', width: 100,
            render: (_, record) => <CustomButton handleClick={handleEditUser} user={record}>Edit</CustomButton>,
        },
        {
            title: 'Delete', width: 100,
            render: (_, record) => {
                return <CustomButton handleClick={handleDeleteUser} user={record} danger>Delete</CustomButton>;
            },
        },
    ];

    const handleCreateUser = () => {
        setEntity(null);
        dispatch(showModal());
    };

    const handleDeleteUser = (user) => {
        dispatch(deleteUserFromApi(user.id));
    };

    const handleEditUser = (user) => {
        setEntity(user);
        dispatch(showModal());
    };

    return (
        <>
            <AddOrUpdateUserModal user={entity}/>
            <Row align={'middle'} justify={'space-between'}>
                <Title>Users:</Title>
                <Button type={'primary'} size={'large'} onClick={handleCreateUser}>Add new</Button>
            </Row>
            <Table columns={columns} dataSource={data} pagination={false}/>
        </>
    );
};

export default UserList;