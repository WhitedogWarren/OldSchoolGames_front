import { useContext, useEffect } from 'react';

import AuthContext from '../../../Contexts/AuthContext';

import './Main.css';
//import IoBox from '../IoBox/IoBox';

function Main() {
    const { authStatus } = useContext(AuthContext);
    useEffect(() => {
        console.log('Main Mounted again');
        return () => {
            console.log('Main destroyed');
        }
    }, [])
    return (
        <div className="Main">
            {console.log(authStatus)}
            <p>Bienvenue</p>
        </div>
    );
}

export default Main;