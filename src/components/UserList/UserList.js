import { Table } from 'antd';
import CustomButton from '../CustomButton';

const UserList = ({ users }) => {
    const data = users.map(user => ({ key: user.id, ...user }));
    const columns = [
        {
            title: 'ID', dataIndex: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Name', dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: text => <a>{text}</a>,
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
            title: 'Edit', key: 'phone',
            render: (_, record) => <CustomButton handleClick={editUser} userId={record.id}>Edit</CustomButton>,
        },
        {
            title: 'Delete', key: 'website',
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
            <Table columns={columns} dataSource={data}/>
        </>
    );
};

export default UserList;