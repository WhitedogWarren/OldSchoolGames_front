exports.ioManagment = (socket, username, updateUserList, updateInvites, navigate, setPlayers) => {
    socket.on('socketNamed', data => {
        data = JSON.parse(data);
        updateUserList(data.userList);
    })
    socket.on('newUser', data => {
        data = JSON.parse(data);
        updateUserList(data.userList);
    })
    socket.on('userLeft', data => {
        data = JSON.parse(data);
        updateUserList(data.userList);
    })
    socket.on('invitesList', invites => {
        updateInvites(JSON.parse(invites));
    })
    socket.on('morpionStarts', data => {
        if(data.host) {
            console.log('hôte : ', data.host);
            console.log('invité : ', username);
            setPlayers({host: data.host, guest: username});
        }
        if(data.guest) {
            console.log('hôte : ', username);
            console.log('invité : ', data.guest);
            setPlayers({host: username, guest: data.guest});
        }
        navigate("/morpion");
    })
}