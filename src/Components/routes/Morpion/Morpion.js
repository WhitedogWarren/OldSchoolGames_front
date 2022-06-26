import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useIoSocket from "../../../hooks/useIoSocket";
import useAuth from "../../../hooks/useAuth";
import useMorpion from "../../../hooks/useMorpion";
import { ioManagment } from './ioMorpionManagment';

import GameBoard from "../GameBoard/GameBoard";
import './Morpion.scss';

function Morpion() {
    const { Socket } = useIoSocket();
    const navigate = useNavigate();
    const { authStatus } = useAuth();
    const {players} = useMorpion();

    let boardWidth;
    
    function handleCellClick(event) {
        console.log('cell clicked : ', event.target.id);
        let data = {
            gameHost: players.host,
            player: authStatus.user.pseudo,
            cellPlayed: event.target.id
        }
        Socket.emit('cellPlayed', data);
    }
    function goBackHome() {
        navigate('/home');
    }
    function emitReload() {
        Socket.emit('gameReload', {host: players.host, from: authStatus.user.pseudo});
    }
    function clearGameBoard() {
        let cells = document.querySelectorAll('.cells');
        for(let cell of cells) {
            cell.innerHTML = '';
        }
    }

    let gameBoard = document.querySelector('.Main');
    let windowBottom = window.innerHeight;
    let height = windowBottom - 60 - (gameBoard.getBoundingClientRect().y + 20);
    let width = document.querySelector('.Main').getBoundingClientRect().width - document.querySelector('.Main').getBoundingClientRect().width%3 -3;
    if(width > height) { //landscape
        boardWidth = height;
    }
    else { //portrait
        boardWidth = width;
    }

    ioManagment(Socket, authStatus.user.pseudo, emitReload, goBackHome, clearGameBoard);

    useEffect(() => {
        

        return () => {
            // clear socket eventListeners
            Socket.off('error');
            Socket.off('gameMessage');
            Socket.off('gameLeft');
            Socket.off('reloadAsked');
            Socket.off('reloadGame');
            // emit gameLeave event ( won't be emitted when user logs out because IoSocketProvider is destroyed )
            Socket.emit('gameLeave', {user: authStatus.user.pseudo, gameHost: players.host});
        }
    }, [Socket, authStatus.user.pseudo, players.host]);

    return (
        <div className="Morpion">
            <GameBoard cols="3" rows="3" width={boardWidth} height={boardWidth} handleCellClick={handleCellClick} />
            <div className="game-message-box">
            </div>
        </div>
    )
}

export default Morpion;