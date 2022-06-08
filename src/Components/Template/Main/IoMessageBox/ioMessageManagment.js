function removeMessage(message) {
    message.style.opacity = 1;
    let interval = setInterval(() => {
        if(message.style.opacity > 0) {
            message.style.opacity = message.style.opacity - 0.1;
        }
        else {
            clearInterval(interval);
        }
    }, 100);
}

exports.ioManagment = (socket) => {
    
    socket.on('message', (data) => {
        console.log('message reçu : ' + data);
        let ioMessage = document.createElement('p');
        ioMessage.innerHTML = data;
        ioMessage.setAttribute('className', 'io-message');
        document.querySelector('.io-inbox').prepend(ioMessage);
        setTimeout(() => {removeMessage(ioMessage)}, 4000);
    })
    socket.on('connexion_acknowledgement', () => {
        socket.emit('setRoom', window.localStorage.getItem('oldschoolgames'));
    })
    socket.on('socketNamed', data => {
        data = JSON.parse(data);
        console.log('socketNamed');
        let welcome = document.createElement('p');
        welcome.innerHTML = `Connecté au serveur io<br>Bienvenue ${data.pseudo}`;
        //updateUserList(data.userList);
        
        welcome.classList.add('io-message');
        document.querySelector('.io-inbox').prepend(welcome);
        setTimeout(() => {removeMessage(welcome)}, 4000);
    })
    socket.on('newUser', data => {
        data = JSON.parse(data);
        console.log('newUser');
        //updateUserList(data.userList);
        let welcome = document.createElement('p');
        welcome.innerHTML = `${data.pseudo} vient de se connecter`;
        welcome.classList.add('io-message');
        document.querySelector('.io-inbox').prepend(welcome);
        setTimeout(() => {removeMessage(welcome)}, 4000);
    })
    socket.on('userLeft', data => {
        data = JSON.parse(data);
        console.log('userLeft');
        //updateUserList(data.userList);
        let welcome = document.createElement('p');
        welcome.innerHTML = `${data.pseudo} vient de partir`;
        welcome.classList.add('io-message');
        document.querySelector('.io-inbox').prepend(welcome);
        setTimeout(() => {removeMessage(welcome)}, 4000);
    })

    socket.on('invitedBy', user => {
        let inviteMessage = document.createElement('p');
        inviteMessage.innerHTML = `${user} vous a invité !`;
        inviteMessage.classList.add('io-message');
        document.querySelector('.io-inbox').prepend(inviteMessage);
        setTimeout(() => {removeMessage(inviteMessage)}, 4000);
    })
}