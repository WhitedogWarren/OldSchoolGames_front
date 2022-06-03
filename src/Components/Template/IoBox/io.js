exports.ioManagment = (socket) => {
    socket.on('message', (data) => {
        let ioMessage = document.createElement('p');
        ioMessage.innerHTML = data;
        ioMessage.setAttribute('className', 'io-message');
        document.querySelector('.io-message').before(ioMessage);
    })
    socket.on('connexion_acknowledgement', () => {
         console.log('socket server aknowledgement');
        socket.emit('setRoom', window.localStorage.getItem('oldschoolgames'));
    })
    socket.on('socketNamed', data => {
        let welcome = document.createElement('p');
        welcome.innerHTML = `Connecté au serveur io<br>Bienvenue ${data}`;
        welcome.classList.add('io-message');
        document.querySelector('.io-inbox').appendChild(welcome);
    })
    socket.on('newUser', data => {
        let welcome = document.createElement('p');
        welcome.innerHTML = `${data} vient de se connecter`;
        welcome.classList.add('io-message');
        document.querySelector('.io-inbox').appendChild(welcome);
    })
    socket.on('userLeft', data => {
        console.log('userLeft');
        let welcome = document.createElement('p');
        welcome.innerHTML = `${data} vient de partir`;
        welcome.classList.add('io-message');
        document.querySelector('.io-inbox').appendChild(welcome);
    })
    
}