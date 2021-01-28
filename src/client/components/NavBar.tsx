import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar: React.FC<NavBarProps> = () => {
    const location = useLocation();
    return (
        <nav className="nav justify-content-center shadow bg-warning p-3 mb-2">
            {/* <p>{location.pathname}</p> shows pathname on page on rerenders*/}
            <div>
                <h3>Andrew's Food Blog</h3>
            </div>
            <div className="nav justify-content-center bg-warning p-3 mb-2">
                <NavLink exact className="mx-5 font-weight-light" activeClassName="text-primary font-weight-bold" to="/">Home</NavLink>
                <NavLink className="mx-5 font-weight-light" activeClassName="text-primary font-weight-bold" to="/new">New Post</NavLink>
                <NavLink className="mx-5 font-weight-light" activeClassName="text-primary font-weight-bold" to="/donate">Donate</NavLink>
                <NavLink className="mx-5 font-weight-light" activeClassName="text-primary font-weight-bold" to="/contact">Contact</NavLink>
                <NavLink className="mx-5 font-weight-light" activeClassName="text-primary font-weight-bold" to="/register">Register</NavLink>
                <NavLink className="mx-5 font-weight-light" activeClassName="text-primary font-weight-bold" to="/login">Login</NavLink>
                <NavLink onClick={() => localStorage.clear()} className="mx-5 font-weight-light" to={{ pathname: '/', state: { msg: 'You Have Been Logged Out' }}}>Logout</NavLink>
            </div>
        </nav>
    );
}

interface NavBarProps { }

export default NavBar;