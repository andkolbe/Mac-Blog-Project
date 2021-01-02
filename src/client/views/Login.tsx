import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';

const Login: React.FC<LoginProps> = props => { // FC stands for function component. Login is a function component
// const Login = (props: LoginProps) => {    Another way to write this. direct strong typing props
    
    const location = useLocation<{ msg: string }>();
    console.log(location.state?.msg); // we only have a state change when we navigate to our login page from the new post page when we aren't logged in

    return (
        <Layout>
            <h1 className="text-center">Login</h1>
            {location.state?.msg && <div className="alert alert-danger text-center">{location.state.msg}</div>}
            <form className="font-weight-bold">
                <div className="mb-4">
                    <label htmlFor="LoginEmail" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="exampleEmail" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="LoginPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="examplePassword"/>
                </div>
                <button type="submit" className="btn btn-primary font-weight-bold">Login</button>
            </form>
        </Layout>
    );
}

interface LoginProps {}

export default Login;