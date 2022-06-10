function displayMessage(message) {
    let messageElement = document.createElement('p');
    messageElement.innerHTML = message;
    messageElement.classList.add('io-message');
    document.querySelector('.io-inbox').prepend(messageElement);
    messageElement.style.opacity = 1;
    setTimeout(() => {
        let interval = setInterval(() => {
            if(messageElement.style.opacity > 0) {
                messageElement.style.opacity = messageElement.style.opacity - 0.1;
            }
            else {
                clearInterval(interval);
                messageElement.remove();
            }
        }, 100)
    }, 4000);
}

exports.ioManagment = (socket) => {
    //server received 'connexion' event and automatiquely responded with a 'connexion_acknowledgement' event
    //client sends back a 'setRoom event with token
    socket.on('connexion_acknowledgement', () => {
        socket.emit('setRoom', window.localStorage.getItem('oldschoolgames'));
    })
    //server responds to a 'setRoom' event with a 'socketNammed' event, meaning that socket has a userName property
    socket.on('socketNamed', data => {
        //console.log('socketNamed');
        data = JSON.parse(data);
        let welcome = `Connecté au serveur io<br>Bienvenue ${data.pseudo}`;
        displayMessage(welcome);
    })
    //display messages
    socket.on('message', (data) => {
        displayMessage(data);
    })
    //server broadcasted a 'newUser' event
    socket.on('newUser', data => {
        //console.log('newUser');
        data = JSON.parse(data);
        let newUserMessage = `${data.pseudo} vient de se connecter`;
        displayMessage(newUserMessage);
    })
    //server broadcasted a 'userLeft' event
    socket.on('userLeft', data => {
        data = JSON.parse(data);
        let userLeftMessage = `${data.pseudo} vient de partir`;
        displayMessage(userLeftMessage);
    })
    //server notices an invitation from $user
    socket.on('invitedBy', user => {
        let inviteMessage = `${user} vous a invité`;
        displayMessage(inviteMessage);
    })
}