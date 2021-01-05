import { token } from 'morgan';
import * as React from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import api, { TOKEN_KEY } from '../utils/api-service';

const Login: React.FC<LoginProps> = props => { // FC stands for function component. Login is a function component
// const Login = (props: LoginProps) => {    Another way to write this. direct strong typing props

    const history = useHistory();
    
    const location = useLocation<{ msg: string }>();
    console.log(location.state?.msg); // we only have a state change when we navigate to our login page from the new post page when we aren't logged in

    const [email, setEmail] = useState('andrew@andrew.com');
    const [password, setPassword] = useState('password123');

    const login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = await api('/auth/login', 'POST', { email, password })
        localStorage.setItem(TOKEN_KEY, token)
        history.goBack();
    }

    // using the service file looks like
    // const token = await apiService('/auth/login', 'POST', {email, password});
    // localStorage.setItem(TOKEN_KEY, token);

    return (
        <Layout>
            <h1 className="text-center">Login</h1>
            {location.state?.msg && <div className="alert alert-danger text-center">{location.state.msg}</div>}
            <form className="font-weight-bold">
                <div className="mb-4">
                    <label htmlFor="LoginEmail" className="form-label">Email Address</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="LoginPassword" className="form-label">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"/>
                </div>
                <button onClick={login} type="submit" className="btn btn-primary font-weight-bold">Login</button>
            </form>
        </Layout>
    );
}

interface LoginProps {}

export default Login;