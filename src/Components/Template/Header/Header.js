import { Link, useLocation } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import Button from "../../_utils/Button/Button";

import './Header.scss';

function Header() {
    const { onLogout, authStatus } = useAuth();
    //console.log( this.context.router.isActive);
    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");
    
    return (
        <header className="Header">
            <div className="ghost-nav"></div>
            <div className="heading-container">
                <h1><Link to="/home">Old School Games</Link></h1>
                <div className="heading-underline">
                    <div className="heading-underline__shadow"></div>
                </div>
            </div>
            <nav>
                {!authStatus.isLoggedIn && (
                    <div>
                        <Link className={splitLocation[1] === "login" ? "active" : ""} to="/login">login</Link>
                        {' | '}
                        <Link className={splitLocation[1] === "signup" ? "active" : ""} to="/signup">signup</Link>
                    </div>
                )}
                {authStatus.isLoggedIn && (
                    <div>
                        <p>
                            {authStatus.user.pseudo}
                        </p>
                        <Button className="logout-button" content="Log out" clickHandler={onLogout} />
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;