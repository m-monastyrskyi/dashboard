import { Typography } from 'antd';

const {Title, Paragraph} = Typography

const ErrorScreen = ({ error }) => (
    <>
        <Title level={1}>Ups... Something went wrong...</Title>
        <Paragraph>{error.message}</Paragraph>
    </>
);

export default ErrorScreen;