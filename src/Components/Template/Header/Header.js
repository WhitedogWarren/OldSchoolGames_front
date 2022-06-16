import { Link } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import './Header.css';

function Header() {
    const { onLogout, authStatus } = useAuth();
    return (
        <header className="Header">
            <div className="ghost-nav"></div>
            <div className="heading-container">
                <h1><Link to="/home">Old School Games</Link></h1>
                <div className="heading-underline">
                    <div className="heading-underline__blue"></div>
                    <div className="heading-underline__yellow"></div>
                    <div className="heading-underline__green"></div>
                    <div className="heading-underline__red"></div>
                    <div className="heading-underline__shadow"></div>
                </div>
            </div>
            <nav>
                {!authStatus.isLoggedIn && (
                    <div>
                        <Link to="/login">login</Link>{' | '}
                        <Link to="/signup">signup</Link>
                    </div>
                )}
                {authStatus.isLoggedIn && (
                    <div>
                        <p>
                            {authStatus.user.pseudo}
                        </p>
                        <button type="button" onClick={onLogout}>
                            Log Out
                        </button>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;