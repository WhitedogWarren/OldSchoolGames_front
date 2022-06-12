import socketIOClient from "socket.io-client";

import IoSocketContext from '../Contexts/IoSocketContext';

function IoSocketProvider({children}) {
    const Socket = socketIOClient('http://192.168.1.58:3000', { transports: ['websocket'] });

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