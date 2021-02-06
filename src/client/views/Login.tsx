import * as React from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import apiJSON, { setStorage } from '../utils/api-service-json';

const Login: React.FC<LoginProps> = props => { // FC stands for function component. Login is a function component
// const Login = (props: LoginProps) => {    Another way to write this. direct strong typing props
// React.FC has opinions. It will automatically strong type props.children for you as react nodes that you wrap. We don't write a lot of componenets that wrap other components
// from a philosophical perspective should we ask if children should be here or not if they don't exist? If this component never has them, why strong type them?
// Why make it an option if that is never going to happen?
// It comes down to, how do we want to use typescript? As a one to one complete documentation of our code? Or intellisense booster?


    const history = useHistory();
    
    const location = useLocation<{ msg: string }>();
    console.log(location.state?.msg); // we only have a state change when we navigate to our login page from the new post page when we aren't logged in

    const [email, setEmail] = useState('andrew@andrew.com');
    const [password, setPassword] = useState('password123');

    const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = await apiJSON('/auth/login', 'POST', { email, password })
        setStorage(token);
        history.goBack();
    }

    return (
        <Layout>
            {location.state?.msg && <div className="alert alert-danger text-center">{location.state.msg}</div>}
            <form className="font-weight-bold">
                <div className="mb-3">
                    <label htmlFor="LoginEmail" className="form-label">Email Address</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="LoginPassword" className="form-label">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"/>
                </div>
                <button onClick={login} type="submit" className="btn btn-success">Login</button>
            </form>
        </Layout>
    );
}

interface LoginProps {}

export default Login;