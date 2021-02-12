const ErrorScreen = ({ error }) => (
    <>
        <h1>Ups... Something went wrong...</h1>
        <pre>{error.message}</pre>
    </>
);

export default ErrorScreen;