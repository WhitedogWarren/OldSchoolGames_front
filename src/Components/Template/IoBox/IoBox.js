import React, {useState, useContext, useCallback, useEffect} from 'react';
//import {SocketContext} from './../../../Contexts/socket';
import socketIOClient from "socket.io-client";

function IoBox() {

    //const socket = useContext(SocketContext).connect('http://localhost:3000', { transports: ['websocket'] });
    const socket = socketIOClient('http://localhost:3000', { transports: ['websocket'] });
    useEffect(() => {
        socket.on('message', (data) => {
            console.log(data);
        })
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