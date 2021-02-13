import { Table } from 'antd';
import CustomButton from '../CustomButton';

const UserList = ({ users }) => {
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
            title: 'Username', dataIndex: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username)
        },
        {
            title: 'City',
            key: 'city',
            sorter: (a, b) => a.address.city.localeCompare(b.address.city),
            render: (_, record) => record.address.city
        },
        {
            title: 'Edit', width: 100,
            render: (_, record) => <CustomButton handleClick={editUser} userId={record.id}>Edit</CustomButton>,
        },
        {
            title: 'Delete', width: 100,
            render: (_, record) => {
                return <CustomButton handleClick={deleteUser} userId={record.id} danger>Delete</CustomButton>;
            },
        },
    ];

    const deleteUser = (id) => {
        console.log('Delete', { id });
    };

    const editUser = (id) => {
        console.log('Edit', { id });
    };

    return (
        <>
            <Table columns={columns} dataSource={data} pagination={false}/>
        </>
    );
};

export default UserList;