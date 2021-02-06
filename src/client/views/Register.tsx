import * as React from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import apiJSON, { setStorage } from '../utils/api-service-json';

const Register = (props: RegisterProps) => {

    const history = useHistory();

    const location = useLocation<{ msg: string }>();
    console.log(location.state?.msg); // we only have a state change when we navigate to our register page from the new post page when we aren't logged in

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const token = await apiJSON('/auth/register', 'POST', { name, email, password })
        setStorage(token);
        history.goBack();
    }

    return (
        <Layout>
            {location.state?.msg && <div className="alert alert-danger text-center">{location.state.msg}</div>}
            <form className="font-weight-bold">
                <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">Email Address</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" aria-describedby="emailHelp" />
                </div>
                <div className="mb-4">
                    <label htmlFor="registerPassword" className="form-label">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" />
                </div>
                <button onClick={register} type="submit" className="btn btn-success">Register</button>
            </form>
        </Layout>
    );
}

interface RegisterProps { }

export default Register;