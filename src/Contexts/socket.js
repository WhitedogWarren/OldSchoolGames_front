import React from 'react';
import socketio from "socket.io-client";

export const socket = socketio;

export const SocketContext = React.createContext();