import React, {useEffect} from 'react';
import socketIOClient from "socket.io-client";
import { ioManagment } from './io';

function IoBox() {

    const socket = socketIOClient('http://localhost:3000', { transports: ['websocket'] });
    useEffect(() => ioManagment(socket), [socket]);

    function testSocket() {
        socket.emit('test', 'test');
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