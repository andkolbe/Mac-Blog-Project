import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
// stripe-js is the connecting library. it connects their api with one of our keys

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import About from './views/About';
import Admin from './views/Admin';
import Contact from './views/Contact';
import Details from './views/Details';
import Donate from './views/Donate';
import Home from './views/Home';
import Login from './views/Login';
import Lulz from './views/Lulz';
import NewPost from './views/NewPost';
import NotFound from './views/NotFound';
import Register from './views/Register';

import { Elements } from '@stripe/react-stripe-js'; 
// Elements allows our form access to stripe's elements components and access the stripe object in any nested component
// it is a wrapping style component similar to our PrivateRoute

const stripePromise = loadStripe('pk_test_51HyS4gIXqaK8Y2qAvhIXEiF3auu4hmNfnyaa6DsaqtvIrokmGdmfa2y4rWgsJEKTz8j52JicFaDUkm0eHmf3WjXi00TDOeQRFM')
// call loadStripe outside of a component’s render to avoid recreating the `Stripe` object on every render
// this will attempt to connect to the stripe services, and when it does, it should return the successful connection to the stripe promise
// we need to feed the successful stripe promise connection into whatever is wrapping the form 
// we have to jump through these hoops to make sure credit card information doesn't reach our code directly

const App: React.FC<AppProps> = props => {

	return (
		<BrowserRouter>
		<NavBar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<PrivateRoute exact path='/about'>
					<About />
				</PrivateRoute>
				<PrivateRoute exact path='/new'>
					<NewPost />
				</PrivateRoute>
				<Route exact path='/details/:id'>
					<Details />
				</Route>
				<PrivateRoute exact path='/admin/:id'>
					<Admin />
				</PrivateRoute>
				<Route exact path='/login'>
					<Login />
				</Route>
				<PrivateRoute exact path='/lulz'>
					<Lulz />
				</PrivateRoute>
				<Route exact path='/contact'>
					<Contact />
				</Route>
				<Route exact path='/donate'>
					<Elements stripe={stripePromise}>
						<Donate/>
					</Elements>
				</Route>
				<Route exact path='/register'>
					<Register />
				</Route>
				<Route exact path='*'>
					<NotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

// interface is a way to define a type 
interface AppProps {} // this is blank because App in index.tsx is not recieving any props

export default App;


