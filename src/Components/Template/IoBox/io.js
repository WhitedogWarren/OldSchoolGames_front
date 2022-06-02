exports.ioManagment = (socket) => {
    socket.on('message', (data) => {
        console.log(data);
        let ioMessage = document.createElement('p');
        ioMessage.innerHTML = data;
        ioMessage.setAttribute('className', 'io-message');
        console.log(document.querySelector('.io-message'));
        document.querySelector('.io-message').before(ioMessage);
    })
    socket.on('connexion_acknowledgement', () => {
        console.log('aknowledgement');
        let welcome = document.createElement('p');
        welcome.innerHTML = 'Connecté au serveur io';
        welcome.classList.add('io-message');
        document.querySelector('.io-inbox').appendChild(welcome);
    })
    return () => {
        // before the component is destroyed
        // unbind all event handlers used in this component
        socket.off();
    };
}