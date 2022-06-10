import { useEffect } from "react";

import useIoSocket from "../../../hooks/useIoSocket";
import { ioManagment } from './ioMorpionManagment';

import './Morpion.scss';

function Morpion() {
    const { Socket } = useIoSocket();
    ioManagment(Socket);
    function handleCellClick(event) {
        console.log('cell clicked : ', event.target.id);
    }


    useEffect(() => {
        console.log('Morpion rendered');
        let gameBoard = document.querySelector('.game-board');
        let windowBottom = window.innerHeight;
        let height = windowBottom - 50 - (gameBoard.getBoundingClientRect().y + 20);
        let width = document.querySelector('.Morpion').getBoundingClientRect().width - document.querySelector('.Morpion').getBoundingClientRect().width%3 -3;
        //Size the gameboard
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
            }
        }

        return () => {
            for(let child of gameBoard.children) {
                child.remove();
            }
        }
    }, []);

    return (
        <div className="Morpion">
            <div className="game-board">
            </div>
        </div>
    )
}

export default Morpion;