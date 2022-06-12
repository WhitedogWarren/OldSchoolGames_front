import { useEffect } from "react";

import useIoSocket from "../../../hooks/useIoSocket";
import useAuth from "../../../hooks/useAuth";
import useMorpion from "../../../hooks/useMorpion";
import { ioManagment } from './ioMorpionManagment';

import './Morpion.scss';

function Morpion() {
    const { Socket } = useIoSocket();
    
    const { authStatus } = useAuth();
    const {players} = useMorpion();
    
    function handleCellClick(event) {
        console.log('cell clicked : ', event.target.id);
        let data = {
            gameHost: players.host,
            player: authStatus.user.pseudo,
            cellPlayed: event.target.id
        }
        Socket.emit('cellPlayed', data);
    }

    useEffect(() => {
        ioManagment(Socket);
        console.log('Morpion rendered');
        console.log(players);
        //Size the gameboard
        let gameBoard = document.querySelector('.game-board');
        let windowBottom = window.innerHeight;
        let height = windowBottom - 60 - (gameBoard.getBoundingClientRect().y + 20);
        let width = document.querySelector('.Morpion').getBoundingClientRect().width - document.querySelector('.Morpion').getBoundingClientRect().width%3 -3;
        let boardWidth;
        if(width > height) { //landscape
            gameBoard.style.height = height + 'px';
            gameBoard.style.width = height + 'px';
            gameBoard.style.margin = 'auto';
            boardWidth = height;
        }
        else { //portrait
            gameBoard.style.height = width + 'px';
            gameBoard.style.width = width + 'px';
            boardWidth = width;
        }
        
        //style for both landscape and portrait
        gameBoard.style.border = '1px solid green';
        gameBoard.style.marginTop = '20px';

        //Draw cells
        for(let i=1; i<4;i++) {
            let col = document.createElement('div');
            col.setAttribute('id', 'col' + i);
            col.setAttribute('class', 'cols');
            gameBoard.appendChild(col);
            //console.log(width);
            col.style.width = boardWidth/3 + 'px';
            for(let y=1;y<4;y++) {
                let cell = document.createElement('div');
                cell.setAttribute('id', 'c' + i + y);
                cell.setAttribute('class', 'cells');
                cell.addEventListener('click', handleCellClick);
                document.getElementById('col' + i).appendChild(cell);
                cell.style.height = boardWidth/3 + 'px';
                cell.style.width = boardWidth/3 + 'px';
                cell.style.fontSize = Math.floor(boardWidth*0.26) + 'px';
            }
        }

        return () => {
            //clear the gameboard
            gameBoard.innerHTML = '';
            console.log(gameBoard.children);
            //////
            // TODO : clear socket eventListeners
            //////
        }
    }, []);

    return (
        <div className="Morpion">
            <div className="game-board">
            </div>
            <div className="game-message-box">
            </div>
        </div>
    )
}

export default Morpion;