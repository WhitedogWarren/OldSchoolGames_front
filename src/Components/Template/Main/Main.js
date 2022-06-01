import { useContext } from 'react';

import AuthContext from '../../../Contexts/AuthContext';

import './Main.css';
import IoBox from '../IoBox/IoBox';

function Main() {
    const { user } = useContext(AuthContext).authStatus;
    
    return (
        <div className="Main">
            <p>Bienvenue {user.pseudo}</p>
            <IoBox/>
        </div>
    );
}

export default Main;