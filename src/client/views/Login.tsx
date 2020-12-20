import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';

const Login: React.FC<LoginProps> = props => { // FC stands for function component. Login is a function component
// const Login = (props: LoginProps) => {    Another way to write this. direct strong typing props
    
    const location = useLocation<{ msg: string }>();
    console.log(location.state?.msg);

    return (
        <Layout>
            <h1 className="text-center">Login</h1>
            {location.state?.msg && <div className="alert alert-danger">{location.state.msg}</div>}
        </Layout>
    );
}

interface LoginProps {}

export default Login;