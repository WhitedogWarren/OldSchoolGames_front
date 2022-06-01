import React, {useEffect} from 'react';
import socketIOClient from "socket.io-client";

function IoBox() {

    const socket = socketIOClient('http://localhost:3000', { transports: ['websocket'] });
    useEffect(() => {
        socket.on('message', (data) => {
            console.log(data);
        })
        socket.on('connexion_acknowledgement', () => {
            console.log('aknowledgement');
        })
        return () => {
            // before the component is destroyed
            // unbind all event handlers used in this component
            socket.off();
        };
    }, [])

    function testSocket() {
        socket.emit('test', 'test');
    }

    return (
        <div>
            <p>IoBox works</p>
            <p onClick={testSocket}>test socket</p>
        </div>
    )
}

export default IoBox;