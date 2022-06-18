exports.ioManagment = (socket, userName, emitReload, goBackHome, clearGameBoard) => {
    socket.on('error', message => {
        document.querySelector('.game-message-box').innerHTML = message;
    })
    socket.on('gameMessage', data => {
        let tokenElement = document.createElement('span');
        tokenElement.appendChild(document.createTextNode(data.token.toUpperCase()));
        document.querySelector('#' + data.cellToDraw).appendChild(tokenElement);
        //////
        // TODO : control data.result and set the proper message to display
        //////
        
        if(!data.result) {
            document.querySelector('.game-message-box').innerHTML = data.message;
        }
        if(data.result) {
            //////
            // TODO : display message + reload button
            //////
            document.querySelector('.game-message-box').innerHTML = '';
            let message = data.message;
            let messageNode = document.createTextNode(message);
            let messageElement = document.createElement('span');
            let reloadButton = document.createElement('span');
            reloadButton.appendChild(document.createTextNode(' Rejouer'));
            messageElement.appendChild(messageNode);
            document.querySelector('.game-message-box').appendChild(messageElement);
            document.querySelector('.game-message-box').appendChild(reloadButton);
            reloadButton.addEventListener('click', emitReload);
        }
        
    })
    socket.on('gameLeft', data => {
        console.log('gameLeft');
        document.querySelector('.game-message-box').innerHTML = `${data} a quitté la partie`;
        setTimeout(() => {
            goBackHome();
        }, 2000)
    })
    socket.on('reloadAsked', data => {
        console.log('reload asked by ', data.by);
        document.querySelector('.game-message-box').innerHTML = '';
        let messageElement = document.createElement('span');
        let reloadButton = document.createElement('span');
        reloadButton.appendChild(document.createTextNode(' Rejouer'));
        let message = '';
        if(data.by !== userName) {
            message = document.createTextNode(`${data.by} souhaite rejouer. `);
            messageElement.appendChild(message);
            messageElement.appendChild(document.createElement('br'));
            
        }
        else {
            messageElement.appendChild(document.createTextNode('Vous avez demandé à rejouer.'));
            messageElement.appendChild(document.createElement('br'));
            messageElement.appendChild(document.createTextNode('En attende de votre adversaire'));
        }
        document.querySelector('.game-message-box').appendChild(messageElement);
        if(data.by !== userName) {
            document.querySelector('.game-message-box').appendChild(reloadButton);
            reloadButton.addEventListener('click', emitReload);
        }
            
        
            
    })
    socket.on('reloadGame', data => {
        document.querySelector('.game-message-box').innerHTML = 'La partie est relancée';
        clearGameBoard();
    })
    
}