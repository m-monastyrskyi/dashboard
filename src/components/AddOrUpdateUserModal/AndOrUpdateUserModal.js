import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Input, message } from 'antd';
import { createUserInApi, hideModal, updateUserInApi, usersSelector } from '../../slices/users';

const AddOrUpdateUserModal = ({ user }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { isLoading, showModal } = useSelector(usersSelector);

    useEffect(() => {
        form.resetFields();
    }, [user]);

    const handleSubmit = () => {
        form.validateFields().then(values => {

            user
                ? dispatch(updateUserInApi(user.id, values))
                : dispatch(createUserInApi(values));

            form.resetFields();
        })
            .catch(error => {
                message.error('Ups... Something went wrong... :(');
                form.resetFields();
                console.log({ error });
            });
    };

    const handleCancel = () => {
        form.resetFields();
        dispatch(hideModal());
    };

    return (
        <Modal
            title={user ? 'Edit user' : 'Add user'}
            visible={showModal}
            okText={user ? 'Save user' : 'Add user'}
            onOk={handleSubmit}
            onCancel={handleCancel}
            confirmLoading={isLoading}
            forceRender
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
                initialValues={user ? {
                    name: user.name,
                    email: user.email
                } : null}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please enter user name' }]}
                >
                    <Input placeholder={'Please enter user name'}/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input E-mail address!',
                        },
                    ]}
                >
                    <Input type={'email'} placeholder={'Email'}/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddOrUpdateUserModal;