import React, {useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";
import { ioManagment } from './io';

function IoBox() {
    //const [socket, setSocket] = useState(socketIOClient('http://192.168.1.58:3000', { transports: ['websocket'] }));
    //const socket = socketIOClient('http://192.168.1.58:3000', { transports: ['websocket'] });
    useEffect(() => {
        console.log('IoBox.useEffect()');
        //ioManagment(socket);
        return () => {
            console.log('IoBox destroyed');
            // before the component is destroyed
            // unbind all event handlers used in this component
            //socket.off();
        };
    }, []);

    function testSocket() {
        //socket.emit('test', 'test');
    }

    return (
        <div>
            <p>IoBox works</p>
            <p onClick={testSocket}>test socket</p>
            <div className="io-inbox">

            </div>
        </div>
    )
}

export default IoBox;