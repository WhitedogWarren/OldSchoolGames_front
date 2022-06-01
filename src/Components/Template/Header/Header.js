//import { useContext } from 'react';
import { Link } from "react-router-dom";

import './Header.css';
//import AuthContext from './../../../Contexts/AuthContext';
import useAuth from "../../../hooks/useAuth";

function Header() {
    //console.log(authStatus);
    const isLoggedIn = useAuth().authStatus.isLoggedIn;
    const { onLogout } = useAuth();
    return (
        <header className="Header">
            <div className="ghost-nav"></div>
            <div className="heading-container">
                <h1><Link to="/">Old School Games</Link></h1>
                <div className="heading-underline">
                    <div className="heading-underline__blue"></div>
                    <div className="heading-underline__yellow"></div>
                    <div className="heading-underline__green"></div>
                    <div className="heading-underline__red"></div>
                    <div className="heading-underline__shadow"></div>
                </div>
            </div>
            <nav>
                {!isLoggedIn && (
                    <div>
                        <Link to="/login">login</Link>{' | '}
                        <Link to="/signup">signup</Link>
                    </div>
                    
                )}
                {isLoggedIn && (
                    <button type="button" onClick={onLogout}>
                        Log Out
                    </button>
                )}
            </nav>
        </header>
    );
}

export default Header;