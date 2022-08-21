import socketIOClient from "socket.io-client";

import IoSocketContext from '../Contexts/IoSocketContext';
import useAuth from "../hooks/useAuth";

function IoSocketProvider({children}) {
    //console.log(process.env.REACT_APP_IO_URL);
    const {authStatus} = useAuth();
    const Socket = socketIOClient(process.env.REACT_APP_IO_URL, { transports: ['websocket'], query: {token: authStatus.token} });
    
    function ioClose() {
        Socket.close();
    }

    const value = {
        Socket,
        ioClose
    }

    return (
        <IoSocketContext.Provider value={value}>
            {children}
        </IoSocketContext.Provider>
    )
}

export default IoSocketProvider;