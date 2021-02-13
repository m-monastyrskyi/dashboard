import React from 'react';
import { Button, Popconfirm } from 'antd';

const CustomButton = ({ children, handleClick, userId, danger }) => {


    return danger
        ? (
            <Popconfirm
                title="Are you sure to delete this user?"
                onConfirm={() => handleClick(userId)}
                okText="Yes"
                cancelText="No"
            >
                <Button danger size={'small'}>
                    {children}
                </Button>
            </Popconfirm>
        ) : (
            <Button size={'small'} onClick={() => handleClick(userId)}>
                {children}
            </Button>
        );


};

export default CustomButton;