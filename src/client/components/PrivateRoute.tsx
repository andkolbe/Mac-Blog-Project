import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TOKEN_KEY } from '../utils/api-service';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => { // children and ...rest are destructured from props
    // ...rest represents the rest of the props of this component
    
    const token = localStorage.getItem(TOKEN_KEY) 
    // you receive a token when you log in

    if (token) { // if we have a correct token, go to the original route path
        return ( // this needs to be dynamic so we can put PrivateRoute on any Route and it will always lead to the correct place
            <Route { ...rest }> 
                { children }
			</Route>
        );
    } else {
        return <Redirect to={{ pathname: '/login', state: { msg: 'You must be logged in to write a new post or edit an existing one' } }} />; // state can be an object
        // Link needs to be clicked on, Redirect happens automatically
        // Redirect is the jsx version of history.push
    }
   
}

interface PrivateRouteProps { // ...rest represents the exact and path props
    exact?: boolean; // you can write paths without exact
    path: string;  
}

export default PrivateRoute;

// children is anything inside of the PrivateRoute component
//  <PrivateRoute exact path='/derp'> <- ...rest passes everything along in the exact path
//      <h1>Derp</h1> <- children 
//  </PrivateRoute>