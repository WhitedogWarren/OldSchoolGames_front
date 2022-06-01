import { useContext } from 'react';

//import { socket, SocketContext } from './../../../Contexts/socket';
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

/* <SocketContext.Provider value={socket}>
                    <p>Bienvenue {user.pseudo}</p>
                    <IoBox/>
                </SocketContext.Provider> */