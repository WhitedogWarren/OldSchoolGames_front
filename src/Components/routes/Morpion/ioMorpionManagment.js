exports.ioManagment = (socket) => {
    socket.on('error', message => {
        console.log(message);
    })
    socket.on('gameMessage', data => {
        document.querySelector('#' + data.cellToDraw).innerHTML = data.token;
        console.log(data.message);
        //////
        // TODO : display messages ( using a component's function )
        //////
    })
}