import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TOKEN_KEY } from '../utils/api-service';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => { // FC stands for function component. PrivateRoute is a function component
// const PrivateRoute = (props: PrivateRouteProps) => {    Another way to write this. direct strong typing props
    
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
        return (
            <Route { ...rest }>
                    { children }
				</Route>
        );
    } else {
        return <Redirect to={{ pathname: '/login', state: { msg: 'You gotta be logged in, dipshit' } }} />;
    }
   
}

interface PrivateRouteProps {
    path: string,
    exact?: boolean
}

export default PrivateRoute;