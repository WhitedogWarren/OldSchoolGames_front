import socketIOClient from "socket.io-client";

import IoSocketContext from '../Contexts/IoSocketContext';

function IoSocketProvider({children}) {
    console.log(process.env.REACT_APP_IO_URL);
    const Socket = socketIOClient(process.env.REACT_APP_IO_URL, { transports: ['websocket'] });

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