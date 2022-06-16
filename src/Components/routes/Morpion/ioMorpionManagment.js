exports.ioManagment = (socket, emitReload, goBackHome, clearGameBoard) => {
    socket.on('error', message => {
        document.querySelector('.game-message-box').innerHTML = message;
    })
    socket.on('gameMessage', data => {
        document.querySelector('#' + data.cellToDraw).innerHTML = data.token;
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
        let message = document.createTextNode(`${data.by} souhaite rejouer. `);
        let messageElement = document.createElement('span');
        messageElement.appendChild(message);
        let reloadButton = document.createElement('span');
        reloadButton.appendChild(document.createTextNode(' Rejouer'));
        document.querySelector('.game-message-box').appendChild(messageElement);
        document.querySelector('.game-message-box').appendChild(reloadButton);
        reloadButton.addEventListener('click', emitReload);    
        
            
    })
    socket.on('reloadGame', data => {
        console.log('La partie va être relancée');
        document.querySelector('.game-message-box').innerHTML = 'La partie va être relancée';
        clearGameBoard();
    })
    
}